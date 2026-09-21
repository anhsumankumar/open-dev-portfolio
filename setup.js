const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const configPath = path.join(__dirname, 'src', 'config', 'portfolio.json');
const htmlPath = path.join(__dirname, 'index.html');

console.log('🚀 Welcome to the Portfolio Template Setup!');
console.log('Let\'s customize this template for you.\n');

// Read existing config or use defaults
let config = {};
if (fs.existsSync(configPath)) {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

const askQuestion = (query, defaultVal) => {
  return new Promise(resolve => {
    rl.question(`${query} [${defaultVal}]: `, (answer) => {
      resolve(answer.trim() || defaultVal);
    });
  });
};

async function setup() {
  const fullName = await askQuestion('What is your Full Name?', config.name || 'Your Name');
  const email = await askQuestion('What is your Email address?', config.email || 'hello@example.com');
  const github = await askQuestion('What is your GitHub URL?', config.socials?.github || 'https://github.com');
  const linkedin = await askQuestion('What is your LinkedIn URL?', config.socials?.linkedin || 'https://linkedin.com');

  const nameParts = fullName.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  config.name = fullName;
  config.firstName = firstName;
  config.lastName = lastName;
  config.email = email;
  
  if (!config.socials) config.socials = {};
  config.socials.github = github;
  config.socials.linkedin = linkedin;

  // Save config
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`\n✅ Saved your details to src/config/portfolio.json`);

  // Update index.html title
  if (fs.existsSync(htmlPath)) {
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    htmlContent = htmlContent.replace(/<title>.*?<\/title>/g, `<title>${fullName} | Portfolio</title>`);
    fs.writeFileSync(htmlPath, htmlContent);
    console.log(`✅ Updated document title in index.html`);
  }

  console.log(`\n🎉 Setup complete!`);
  console.log(`\n📝 Next steps:`);
  console.log(`1. Open src/config/portfolio.json to update your Skills, Experience, and Bio.`);
  console.log(`2. Replace public/favicon.ico with your own logo to update the browser tab icon.`);
  console.log(`3. Run 'npm run dev' to see your new customized portfolio!\n`);
  
  rl.close();
}

setup();
