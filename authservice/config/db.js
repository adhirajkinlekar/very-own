// config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

// const mongooseConfig = {
//   useNewUrlParser: true,            // Use the new MongoDB connection string parser to handle connection strings correctly
//   useUnifiedTopology: true,         // Use the new Server Discover and Monitoring engine for improved performance and stability
//   connectTimeoutMS: 10000,          // Maximum time (in milliseconds) to wait for the connection to be established (10 seconds)
//   socketTimeoutMS: 45000,           // Maximum time (in milliseconds) to wait for a read/write operation to complete (45 seconds)
//   serverSelectionTimeoutMS: 5000,   // Maximum time (in milliseconds) to wait for server selection before timing out (5 seconds)
//   poolSize: 10,                     // Maximum number of connections in the connection pool (default is 5)
//   w: 'majority',                    // Write concern: wait for write operations to be acknowledged by the majority of replica set members
//   retryWrites: true,                // Enable retryable writes to handle transient errors automatically
//   useCreateIndex: true,             // Use createIndex() instead of ensureIndex() to avoid deprecation warnings
//   useFindAndModify: false,          // Use native findOneAndUpdate() instead of findAndModify() to avoid deprecation warnings
//   autoIndex: true,                   // Automatically build indexes for the schemas defined (useful in development)
//   debug: true,                       // Enable Mongoose debug mode to log all queries to the console for easier debugging
//   maxPoolSize: 15,                  // Set the maximum number of connections in the connection pool (can be used in place of poolSize)
//   minPoolSize: 5,                   // Set the minimum number of connections in the connection pool (ensures a certain number are always available)
//   maxTimeMS: 20000,                 // Set the maximum time (in milliseconds) for queries to run before being terminated (20 seconds)
//   auth: { authSource: 'admin' },    // Specify the authentication database if the user is created in a different database than the one being connected to
// };