const stan = require('node-nats-streaming');

// NATS Streaming server configuration
const clusterID = 'test-cluster';
const clientID = 'academy-service';
const url = process.env.NATS_URL || 'nats://localhost:4222';

const retries = 5;
const delay = 5000; // 5 seconds

let attempt = 0;
let client;

const tryConnect = () => {
    client = stan.connect(clusterID, clientID, { url });

    client.on('connect', () => {
        console.log('Connected to NATS Streaming');
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
        console.log('Subscriber connection closed');
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

// Export the client object
module.exports = client;
