const fs = require('fs');
const path = require('path');

const newLogo = process.argv[2] || 'AK';
const logoPath = path.join(__dirname, 'src', 'config', 'logo.json');

const config = {
  logoText: newLogo
};

fs.writeFileSync(logoPath, JSON.stringify(config, null, 2));
