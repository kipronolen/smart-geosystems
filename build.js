const fs = require('fs');
const path = require('path');

console.log('🔨 Starting Vercel build process...');

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
    console.log('✅ Created dist directory');
}

// Copy root index.html (already has correct paths for Vercel)
const rootIndexPath = path.join(__dirname, 'index.html');
if (fs.existsSync(rootIndexPath)) {
    fs.copyFileSync(rootIndexPath, path.join(distDir, 'index.html'));
    console.log('✅ Copied root index.html with Vercel paths');
}

// Copy and modify sentmailtracker.html for Vercel
const sentMailTrackerPath = path.join(__dirname, 'public', 'sentmailtracker.html');
if (fs.existsSync(sentMailTrackerPath)) {
    let content = fs.readFileSync(sentMailTrackerPath, 'utf8');

    // Convert relative paths to absolute paths for Vercel
    content = content
        .replace(/href="css\/style\.css"/g, 'href="/public/css/style.css"')
        .replace(/src="js\/main\.js"/g, 'src="/public/js/main.js"');

    fs.writeFileSync(path.join(distDir, 'sentmailtracker.html'), content);
    console.log('✅ Created sentmailtracker.html with Vercel paths');
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