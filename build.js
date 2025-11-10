const fs = require('fs');
const path = require('path');

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Copy index.html to dist
fs.copyFileSync(
    path.join(__dirname, 'index.html'),
    path.join(distDir, 'index.html')
);

// Copy and modify sentmailtracker.html to dist
let sentMailTrackerContent = fs.readFileSync(
    path.join(__dirname, 'public', 'sentmailtracker.html'), 
    'utf8'
);

// Fix paths for root-level deployment
sentMailTrackerContent = sentMailTrackerContent
    .replace(/href="css\//g, 'href="public/css/')
    .replace(/src="js\//g, 'src="public/js/')
    .replace(/href="\.\.\/index\.html"/g, 'href="/index.html"')
    .replace(/href="\.\.\/index\.html#/g, 'href="/index.html#');

fs.writeFileSync(
    path.join(distDir, 'sentmailtracker.html'),
    sentMailTrackerContent
);

// Copy entire public directory to dist
function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

copyDir(path.join(__dirname, 'public'), path.join(distDir, 'public'));

console.log('✅ Build completed successfully!');
console.log('📁 Files copied to dist/ directory');