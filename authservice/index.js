// index.js
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const dotenv = require('dotenv');
const cors = require('cors');
// const stan = require('node-nats-streaming');
const ServiceSSODetail = require('./models/ServiceSSO');
// const client = require('./nats'); // Import the NATS client

// Check NATS client connection
// if (!client || client.isClosed()) {
//   console.error('NATS Streaming client is not connected!');
//   process.exit(1);
// }

dotenv.config();

const app = express();

const corsOptions = {
  origin: '*',  // Adjust this as needed to restrict access
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204 // Ensure the preflight response is successful
};

app.use(cors(corsOptions));

// Explicitly handle OPTIONS requests
app.options('*', cors(corsOptions));

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));


app.get('/', (_req, res)=>{

  res.send("health ok!");
});

// Define Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT  

app.listen(PORT, '0.0.0.0',  () => console.log(`Server started on port ${PORT}!`));
