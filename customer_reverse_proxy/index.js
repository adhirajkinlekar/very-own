const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Middleware to handle subdomain logic and proxy
app.get('/', (req, res, next) => {
    try {

        const host = req.headers.host; // Get the host from the request headers
        const domainParts = host.split('.'); // Split the host by dots

        let subdomain;
        // Check if there is a subdomain
        if (domainParts.length > 2) {
            subdomain = domainParts[0]; // Subdomain will be the first part
        } else {
            throw new Error("Bad Request: No subdomain found");
        }

        // Set the target based on the subdomain
        const target = subdomain === "smallpond"
            ? "http://landing.in/3002"
            : "http://landing.in/3002";

        console.log(`Proxying request to: ${target}`);

        // Create and call the proxy middleware with the dynamic target
        const proxy = createProxyMiddleware({
            target,
            changeOrigin: true,
        });

        // Pass the request to the proxy middleware
        proxy(req, res, next);


    } catch (err) {
        console.log({ err })
        next(err); // Pass the error to the global error handler
    }
});

// Global error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).json({ message: err.message || "Internal Server Error" });
});

app.listen(3000, '0.0.0.0', () => { // Make sure that your server listens on all interfaces (or at least 127.0.0.1) with this configuration:
    console.log('Proxy server is running on port 3000');
});

