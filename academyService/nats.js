// natsClient.js
const stan = require('node-nats-streaming');

// NATS Streaming server configuration
const clusterID = 'test-cluster';

const clientID = 'auth-service';

const url = 'nats://localhost:4222';

// Create and connect the NATS Streaming client
const client = stan.connect(clusterID, clientID, { url });

client.on('connect', () => {
  console.log('Academy service has been connected to NATS Streaming');
});

client.on('error', (err) => {
  console.error('NATS Streaming connection error:', err);
});

module.exports = client;
