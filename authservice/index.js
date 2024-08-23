// index.js
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const dotenv = require('dotenv');
const cors = require('cors');
const stan = require('node-nats-streaming');

dotenv.config();

const app = express();

app.use(cors(
  // {
  //   origin: 'http://localhost:3000', // Allow requests from this origin
  //   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  //   credentials: true // Allow cookies to be sent with requests
  // }
));

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', authRoutes);





// Connect to NATS Streaming server
const client = stan.connect('test-cluster', 'subscriber', {
  url: 'nats://localhost:4222',
});

client.on('connect', () => {
  console.log('Subscriber connected to NATS');

  // Subscribe to the subject
  const subscription = client.subscribe('academy.created');

  subscription.on('message', (msg) => {
    const data = msg.getData();
    console.log('Received a message:', JSON.parse(data));
  });
});

client.on('close', () => {
  console.log('Subscriber connection closed');
});

const PORT = process.env.PORT  

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
