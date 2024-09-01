// natsClient.js
const stan = require('node-nats-streaming');
const serviceEnrollment = require('./models/service_enrollments');  

const clusterID = 'test-cluster';
const clientID = 'admin-service';
const url = process.env.NATS_URL ? 'nats://nats-streaming:4222' : 'nats://localhost:4222';

const retries = 5;
const delay = 5000; // 5 seconds

let attempt = 0;
let client;

const tryConnect = () => {
    client = stan.connect(clusterID, clientID, { url });

    client.on('connect', () => {
        console.log('Connected to NATS Streaming');

        // Subscribe to the subject
        const subscription = client.subscribe('service.created');

        // Handle incoming messages
        subscription.on('message', async (msg) => {
            try {
                const data = msg.getData();
                const parsedData = JSON.parse(data);

                console.log({ parsedData });

                // Create a new instance of ServiceSSODetail and save it
                const newServiceEnrollment = new serviceEnrollment(parsedData);
                await newServiceEnrollment.save();

                console.log('Received a message and saved to the database:', parsedData);
            } catch (error) {
                console.error('Error processing message:', error);
            }
        });
    });

    client.on('error', (err) => {
        console.error(`NATS Streaming connection error: ${err.message}`);
        attempt++;
        if (attempt < retries) {
            console.log(`Retrying in ${delay / 1000} seconds...`);
            setTimeout(tryConnect, delay);
        } else {
            console.error('Failed to connect to NATS Streaming after multiple retries');
        }
    });

    client.on('close', () => {
        console.log('NATS Streaming connection closed');
        attempt++;
        if (attempt < retries) {
            console.log(`Retrying in ${delay / 1000} seconds...`);
            setTimeout(tryConnect, delay);
        } else {
            console.error('Failed to reconnect to NATS Streaming after multiple retries');
        }
    });
};

// Start the connection attempt
tryConnect();

module.exports = client;
