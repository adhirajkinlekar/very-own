const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const mongoose = require('mongoose');
const { createClient } = require('redis');
const Subdomain = require('./models/subdomain');
const client = require('./nats'); // Import the NATS client

// Check NATS client connection
if (!client || client.isClosed()) {
    console.error('NATS Streaming client is not connected!');
    process.exit(1);
}

const app = express();

let redisClient;

mongoose.connect('mongodb+srv://adhirajkinlekar:CcZiZ8rf9uMtdRBf@cluster-0.wo3qq8n.mongodb.net/configDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');

    // Configure Redis
    redisClient = createClient({
        password: '2pGLmx7RJL3KgwBhWywFLziOksPVAdum',
        socket: {
            host: 'redis-18424.c1.us-central1-2.gce.redns.redis-cloud.com',
            port: 18424,
            family: 4, // Force IPv4
            reconnectStrategy: 1000 // Reconnect after 1 second if failed
        }
    });

    redisClient.connect()
        .then(async () => {
            console.log('Connected to Redis');

            try {
                const documents = await Subdomain.find().lean();

                if (documents.length === 0) {
                    console.log('No documents found');
                }
                else {
                    const multi = redisClient.multi();
                    for (const doc of documents) {
                        multi.set(`lookup:${doc.subdomainName}`, JSON.stringify(doc));
                    }

                    await multi.exec(); // Execute only if there are commands queued

                    console.log('All documents stored in Redis');
                }

            } catch (err) {
                console.error('Error querying documents or storing in Redis:', err);
            }
        })
        .catch((err) => {
            console.error('Failed to connect to Redis', err);
        });

    redisClient.on('error', (err) => {
        console.error('Redis error:', err);
    });

}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Function to get application type based on subdomain
async function getApplicationType(key) {
    try {
        const cachedData = await redisClient.get(`lookup:${key}`);

        if (cachedData) {
            return JSON.parse(cachedData).applicationType;
        }

        const data = await Subdomain.findOne({ subdomainName: key }).exec();

        if (data) {
            await redisClient.set(`lookup:${key}`, JSON.stringify(data));
            return data.applicationType;
        } else {
            throw new Error("Could not find the tenant");
        }
    } catch (err) {
        console.error('Error getting application type:', err);
        throw err;
    }
}

// Middleware to handle subdomain logic and proxy
app.use(async (req, res, next) => {
    try {
        const host = req.headers.host;
        const domainParts = host.split('.');
        let subdomain;

        if (domainParts.length > 2) {
            subdomain = domainParts[0];
        } else {
            return res.status(400).send('Bad Request: No subdomain found');
        }

        const applicationType = await getApplicationType(subdomain);
        const target = applicationType === "academy"
            ? "http://academy-ui-cluster-ip-service:3000"
            : applicationType === "store"
                ? "http://store-ui-cluster-ip-service:3005"
                : (() => { throw new Error(`Unsupported applicationType: ${applicationType}`); })();

        console.log(`Proxying request to: ${target}`);

        // Create and call the proxy middleware with the dynamic target
        const proxy = createProxyMiddleware({
            target,
            changeOrigin: true,
            secure: true
        });

        // Pass the request to the proxy middleware
        return proxy(req, res, next);

    } catch (err) {
        console.error('Error in proxy handling:', err);
        next(err);
    }
});

// Global error-handling middleware
app.use((err, req, res, next) => {
    console.error('Global error handler:', err.stack);
    res.status(500).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Error</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                .container { max-width: 800px; margin: 0 auto; }
                h1 { color: #d9534f; }
                p { color: #333; }
                a { color: #337ab7; text-decoration: none; }
                a:hover { text-decoration: underline; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Something Went Wrong</h1>
                <p>We’re sorry, but something went wrong on our end. Please try again later.</p>
                <p>If the problem persists, <a href="/">return to the homepage</a>.</p>
            </div>
        </body>
        </html>
    `);
});

// Start the server
const PORT = process.env.PORT || 3006;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Reverse proxy server is running on port ${PORT}`);
});
