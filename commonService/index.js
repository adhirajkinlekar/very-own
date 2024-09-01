 
const express = require('express');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const { format } = require('util');
const cors = require('cors');

// Initialize express app
const app = express();
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
    fileSize: 10 * 1024 * 1024 // Limit file size to 10MB
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
