const app = require('./api/index');
const PORT = process.env.PORT || 3000;

// Only start server if not in Vercel environment
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Smart GeoSystems server running on port ${PORT}`);
        console.log(`📍 Visit: http://localhost:${PORT}`);
        console.log(`📧 SentMailTracker: http://localhost:${PORT}/sentmailtracker`);
    });
}

module.exports = app;