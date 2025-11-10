const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    try {
        const indexPath = path.join(__dirname, '../public/index.html');
        const html = fs.readFileSync(indexPath, 'utf8');
        
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(html);
    } catch (error) {
        res.status(500).json({ error: 'Unable to load page' });
    }
};