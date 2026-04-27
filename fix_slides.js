const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html') && f !== 'index.html');

const commonStyles = `
<style id="presentation-fix">
    :root {
        --base-font-size: 2.2vmin;
    }
    * {
        word-wrap: break-word;
        overflow-wrap: break-word;
    }
    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #000;
    }
    .main-container, body > div:not(.bg-decoration):not(.floating-foods) {
        width: 100vw;
        height: 56.25vw; /* 16:9 aspect ratio */
        max-height: 100vh;
        max-width: 177.78vh; /* 16:9 aspect ratio */
        margin: auto;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        padding: 4vmin !important;
        box-sizing: border-box;
        background: linear-gradient(135deg, #FFF9E6 0%, #FFFEF7 50%, #F5F5DC 100%); /* Default fallback */
    }
    /* Re-apply original backgrounds if they were on body */
    body {
        background: #000 !important;
    }
    
    .header { margin-bottom: 2vmin !important; }
    .main-title { font-size: 4vmin !important; }
    .content-wrapper, .content-grid { 
        flex: 1; 
        display: flex; 
        gap: 3vmin !important; 
        min-height: 0; 
        align-items: stretch !important;
    }
    .glass-card { 
        padding: 3vmin !important; 
        border-radius: 2vmin !important;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    h2 { font-size: 3vmin !important; margin-bottom: 1.5vmin !important; }
    p, li, .item-text, .stat-desc, .value-prop-content, .mission-content { 
        font-size: 2.2vmin !important; 
        line-height: 1.4 !important; 
    }
    .footer { margin-top: auto !important; padding-top: 1vmin !important; }
    .page-number { font-size: 1.8vmin !important; }

    /* Responsive adjustments */
    @media (max-aspect-ratio: 16/9) {
        .main-container, body > div:not(.bg-decoration):not(.floating-foods) {
            width: 100vw;
            height: 56.25vw;
        }
    }
    @media (min-aspect-ratio: 16/9) {
        .main-container, body > div:not(.bg-decoration):not(.floating-foods) {
            height: 100vh;
            width: 177.78vh;
        }
    }
</style>
`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove existing fix if any
    content = content.replace(/<style id="presentation-fix">[\s\S]*?<\/style>/g, '');
    
    // Inject styles before </head>
    if (content.includes('</head>')) {
        content = content.replace('</head>', commonStyles + '\n</head>');
    } else {
        content = content.replace('<body', commonStyles + '\n<body');
    }
    
    // Ensure navigation.js is included
    if (!content.includes('navigation.js')) {
        content = content.replace('</body>', '<script src="navigation.js"></script>\n</body>');
    }
    
    fs.writeFileSync(file, content);
    console.log(`Processed ${file}`);
});
