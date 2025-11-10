const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get('/sentmailtracker', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'sentmailtracker.html'));
});

// Health check for Vercel
app.get('/api/health', (req, res) => {
    res.json({ status: 'Smart GeoSystems is running!' });
});

module.exports = app;