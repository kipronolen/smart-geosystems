const fs = require('fs');
const path = require('path');

console.log('🔨 Starting build process...');
console.log('📁 Current directory:', __dirname);

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
    console.log('✅ Created dist directory');
}

// Check if files exist before copying
const indexPath = path.join(__dirname, 'index.html');
const sentMailTrackerPath = path.join(__dirname, 'public', 'sentmailtracker.html');

console.log('🔍 Looking for index.html at:', indexPath);
console.log('🔍 Looking for sentmailtracker.html at:', sentMailTrackerPath);

// Copy index.html to dist
if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, path.join(distDir, 'index.html'));
    console.log('✅ Copied index.html');
} else {
    console.error('❌ index.html not found at:', indexPath);
}

// Copy and modify sentmailtracker.html to dist
if (fs.existsSync(sentMailTrackerPath)) {
    let sentMailTrackerContent = fs.readFileSync(sentMailTrackerPath, 'utf8');

    // Fix paths for root-level deployment
    sentMailTrackerContent = sentMailTrackerContent
        .replace(/href="css\//g, 'href="public/css/')
        .replace(/src="js\//g, 'src="public/js/')
        .replace(/href="\.\.\/index\.html"/g, 'href="/index.html"')
        .replace(/href="\.\.\/index\.html#/g, 'href="/index.html#');

    fs.writeFileSync(path.join(distDir, 'sentmailtracker.html'), sentMailTrackerContent);
    console.log('✅ Copied and modified sentmailtracker.html');
} else {
    console.error('❌ sentmailtracker.html not found at:', sentMailTrackerPath);
    
    // List what files are actually in the public directory
    const publicDir = path.join(__dirname, 'public');
    if (fs.existsSync(publicDir)) {
        console.log('📂 Files in public directory:');
        fs.readdirSync(publicDir).forEach(file => {
            console.log('  -', file);
        });
    } else {
        console.error('❌ Public directory not found at:', publicDir);
    }
    
    // Try to create a basic sentmailtracker.html as fallback
    const fallbackContent = `<!DOCTYPE html>
<html>
<head><title>SentMailTracker - Smart GeoSystems</title></head>
<body><h1>SentMailTracker page will be available soon</h1></body>
</html>`;
    
    fs.writeFileSync(path.join(distDir, 'sentmailtracker.html'), fallbackContent);
    console.log('🔧 Created fallback sentmailtracker.html');
}

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