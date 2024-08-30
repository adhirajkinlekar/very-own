// index.js
const express = require('express');
const cors = require('cors');
const stan = require('node-nats-streaming');
const serviceEnrollment = require("./models/service_enrollments");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3003;

// Middleware
app.use(cors());

app.use(express.json());

mongoose.connect('mongodb+srv://adhirajkinlekar:CcZiZ8rf9uMtdRBf@cluster-0.wo3qq8n.mongodb.net/adminDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

const getCurrentUser = (req, res, next) => {

  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {

    if (err) return res.sendStatus(403);

    req.currentUser = payload;

    next();
  });
}
app.get('/dashboard', getCurrentUser, async (req, res) => {

  try {
    const userId = new mongoose.Types.ObjectId(req.currentUser.id);

    const academies = await serviceEnrollment.find({ userId }).select('type');

    const uniqueAcademies = [...new Set(academies.map(item => item.type))];

    res.status(200).json({ enrolledServices: uniqueAcademies });
  }
  catch (err) {
  }
});

// Connect to NATS Streaming server
const client = stan.connect('test-cluster', 'admin-service', {

  url: process.env.NATS_URL ? 'nats://nats-streaming:4222' : 'nats://localhost:4222'
});

client.on('connect', () => {
  console.log('Subscriber connected to NATS');

  // Subscribe to the subject
  const subscription = client.subscribe('service.created');

  // Use async in the message callback
  subscription.on('message', async (msg) => {
    try {
      const data = msg.getData();

      // Parse the received data if necessary
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

client.on('close', () => {
  console.log('Subscriber connection closed');
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${port}`);
});
