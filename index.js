const express = require("express");
const cors = require('cors');
const path = require('path');
require("dotenv").config();
const sendMail = require('./controller/mailer'); // Import the mailer

const app = express();

// CORS options
const corsOptions = {
    origin: 'https://radiant-caramel-7ef8f7.netlify.app', // Your frontend URL on Netlify
    credentials: true,
    optionsSuccessStatus: 200
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Log requests for debugging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Route to send email
app.post('/send-email', (req, res) => {
    const { email, subject, html } = req.body;

    // Validate input
    if (!email || !subject || !html) {
        return res.status(400).json({ error: 'Please provide email, subject, and message.' });
    }

    // Send the email
    sendMail(email, subject, html);
    res.status(200).json({ message: 'Email sent successfully!' });
});

// Fallback route for undefined API endpoints
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Serve frontend for all non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// General error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'An error occurred!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
