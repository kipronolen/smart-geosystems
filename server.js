const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/sentmailtracker', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sentmailtracker.html'));
});

// Only start server if not in Vercel environment
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Smart GeoSystems server running on port ${PORT}`);
        console.log(`📍 Visit: http://localhost:${PORT}`);
        console.log(`📧 SentMailTracker: http://localhost:${PORT}/sentmailtracker`);
    });
}

module.exports = app;