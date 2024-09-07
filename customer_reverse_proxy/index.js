const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Middleware to handle subdomain logic and proxy
app.use((req, res, next) => {
    try {
        const host = req.headers.host; // Get the host from the request headers
        const domainParts = host.split('.'); // Split the host by dots

        let subdomain;

        if (domainParts.length > 2) {
            subdomain = domainParts[0]; // Subdomain will be the first part
        } else {
            throw new Error("Bad Request: No subdomain found");
        } 

        // Set the target based on the subdomain
        const target = subdomain === "smallpond"
            ? "http://academy-ui-cluster-ip-service:3000"
            : "http://store-ui-cluster-ip-service:3005";

            console.log(`Proxying request to: ${target}`);

        // Create and call the proxy middleware with the dynamic target
        const proxy = createProxyMiddleware({
            target,
            changeOrigin: true,
            secure: true
        });

        // Pass the request to the proxy middleware
        proxy(req, res, next);
    } catch (err) {
        console.error('Error in proxy handling:', err);
        next(err); // Pass the error to the global error handler
    }
});

// Global error-handling middleware
app.use((err, req, res, next) => {
    console.error('Global error handler:', err.stack); // Log the error stack for debugging
    res.status(500).json({ message: err.message || "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 3006;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Reverse proxy server is running on port ${PORT}`);
});
