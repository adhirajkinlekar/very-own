const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const academyRoutes = require('./routes/academy'); 

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');

const app = express();

app.use(cors());
// Middleware to parse JSON bodies
app.use(bodyParser.json());


// Middleware to parse JSON bodies

// Connect to MongoDB
mongoose.connect('mongodb+srv://adhirajkinlekar:CcZiZ8rf9uMtdRBf@cluster-0.wo3qq8n.mongodb.net/academyDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Routes
app.use('/api/academy', academyRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
