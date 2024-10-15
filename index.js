const express = require("express");
const cors = require('cors');
require("dotenv").config();
// const userRoutes = require('./routes/userRoutes');
const sendMail = require('./controller/mailer'); // Import the mailer

const app = express();
const PORT = process.env.PORT || 3000;

// CORS options
const corsOptions = {
    origin: 'http://localhost:5173' || 'https://incandescent-choux-02bcae.netlify.app/', // Update this to match your frontend URL
    credentials: true,
    optionsSuccessStatus: 200
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Log requests for debugging
// app.use((req, res, next) => {
//     console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//     next();
// });

// Route to send email
app.post('/send-email', (req, res) => {
    const { email, subject, html } = req.body;

    // Validate input
    if (!email || !subject || !html) {
        return res.status(400).json({ error: 'Please provide name, email, subject, and message.' });
    }

    // Send the email
    sendMail(email, subject, html);
    res.status(200).json({ message: 'Email sent successfully!' });
});

// Routes
// app.use('/api/user', userRoutes); // Use your routes, or add more as needed

// Fallback route for undefined endpoints
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// General error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'An error occurred!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});
