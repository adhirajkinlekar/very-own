// index.js
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const dotenv = require('dotenv');
const cors = require('cors');

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

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
