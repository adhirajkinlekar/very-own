 
const express = require('express');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const { format } = require('util');
const cors = require('cors');

// Initialize express app
const app = express();

// Increase body size limit to 500MB
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

app.use(cors());

const PORT = process.env.PORT || 3004;

const keyFile = path.join(__dirname, 'veryown-c553acc3324b.json');
 
// Initialize Google Cloud Storage client
const storage = new Storage({
  keyFilename: keyFile,  // Path to your service account key file
});

const bucketName = 'veryown_primary_bucket'; // Replace with your bucket name
const bucket = storage.bucket(bucketName);

// Set up multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024 // Limit file size to 25MB
  }
});

app.get('/', (req,res)=>{

  res.status(200).send("Health is ok")
})

// Upload endpoint to handle file uploads
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }

    // Create a new blob in the bucket and upload the file data
    const blob = bucket.file(Date.now() + path.extname(req.file.originalname));
    
    const blobStream = blob.createWriteStream({
      resumable: false
    });

    blobStream.on('error', (err) => {
      res.status(500).send({ error: err.message });
    });

    blobStream.on('finish', () => {
      // The public URL of the file
      const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
      res.status(200).send({
        message: 'File uploaded successfully',
        fileName: req.file.originalname,
        url: publicUrl
      });
    });

    blobStream.end(req.file.buffer);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


// Route to stream media files
app.get('/stream/:fileName', async (req, res) => {
  const fileName = req.params.fileName;
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(fileName);

  // Stream the file directly to the response
  file.createReadStream()
    .on('error', (err) => {
      console.error('Error streaming file:', err);
      res.status(500).send('Error streaming file');
    })
    .on('response', (response) => {
      // Set the correct MIME type for video
      res.set('Content-Type', 'video/mp4');
    })
    .pipe(res);
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Common service running on port ${PORT}`);
});



 
    // Promisify NATS publish and subscription logic
    // const requestValueById = (requestId) => {
    //     return new Promise((resolve, reject) => {
    //         // Listen for the response from Service B
    //         const subscription = natsClient.subscribe('response-to-serviceA', 'serviceA-group');

    //         // Publish the request to NATS (requesting value by ID)
    //         natsClient.publish('get-value-by-id', JSON.stringify({ id: requestId }), (err) => {
    //             if (err) {
    //                 reject('Error publishing request:', err);
    //             }
    //         });

    //         // Wait for the response
    //         subscription.on('message', (msg) => {
    //             const responseData = JSON.parse(msg.getData());

    //             // Resolve the promise only when the ID matches the request
    //             if (responseData.id === requestId) {
    //                 console.log('Received response:', responseData);
    //                 resolve(responseData);
    //                 subscription.unsubscribe(); // Unsubscribe after receiving the response
    //             }
    //         });

    //         // Set a timeout to reject the promise if no response is received in time
    //         setTimeout(() => {
    //             reject(new Error('Request timed out'));
    //             subscription.unsubscribe(); // Clean up subscription on timeout
    //         }, 5000); // Timeout set to 5 seconds
    //     });
    // };

    // API Endpoint to get value by ID using async/await
    // app.get('/get-value/:id', async (req, res) => {
    //     const requestId = req.params.id;
    //     try {
    //         const response = await requestValueById(requestId);  // Await the response from NATS
    //         res.json(response);  // Send the response back to the client
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).send(error.message);  // Handle errors or timeouts
    //     }
    // });

 

//     const nats = require('node-nats-streaming');
// const client = nats.connect('test-cluster', 'serviceB-client');

// client.on('connect', () => {
//     console.log('Service B connected to NATS');

//     // Subscribe to the request topic
//     const subscription = client.subscribe('get-value-by-id', 'serviceB-group');

//     subscription.on('message', (msg) => {
//         const requestData = JSON.parse(msg.getData());
//         const id = requestData.id;
//         console.log(`Received request for ID: ${id}`);

//         // Simulate value fetching (e.g., database call)
//         const value = getValueById(id);

//         // Respond back to Service A
//         const responseTopic = 'response-to-serviceA';
//         client.publish(responseTopic, JSON.stringify({ id, value }), (err, guid) => {
//             if (err) {
//                 console.error('Error publishing response:', err);
//             } else {
//                 console.log('Response sent with guid:', guid);
//             }
//         });
//     });
// });

// function getValueById(id) {
//     // Mock function to simulate a data store
//     const dataStore = {
//         '123': 'Value for ID 123',
//         '456': 'Value for ID 456'
//     };
//     return dataStore[id] || 'Not Found';
// }
