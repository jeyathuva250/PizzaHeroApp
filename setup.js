const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Next.js setup script...');

try {
  console.log('Running npm install...');
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
  
  console.log('Creating public directory...');
  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  console.log('Copying images...');
  const srcPizza = 'C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\a76ac75f-87b7-485c-ac3b-9993875c8d06\\pizza_hero_main_1775121930838.png';
  const destPizza = path.join(publicDir, 'pizza.png');
  fs.copyFileSync(srcPizza, destPizza);

  const srcLeaf = 'C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\a76ac75f-87b7-485c-ac3b-9993875c8d06\\basil_leaf_1775122012085.png';
  const destLeaf = path.join(publicDir, 'basil-leaf.png');
  fs.copyFileSync(srcLeaf, destLeaf);
  
  console.log('Setup finished successfully!');
} catch (error) {
  console.error('An error occurred during setup:', error);
  process.exit(1);
}
