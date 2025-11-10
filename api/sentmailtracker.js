const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    try {
        const sentMailTrackerPath = path.join(__dirname, '../public/sentmailtracker.html');
        const html = fs.readFileSync(sentMailTrackerPath, 'utf8');
        
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(html);
    } catch (error) {
        res.status(500).json({ error: 'Unable to load SentMailTracker page' });
    }
};