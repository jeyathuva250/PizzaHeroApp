const fs = require('fs');
const path = require('path');
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) { fs.mkdirSync(publicDir); }
fs.copyFileSync('C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\a76ac75f-87b7-485c-ac3b-9993875c8d06\\pizza_hero_main_1775121930838.png', path.join(publicDir, 'pizza.png'));
fs.copyFileSync('C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\a76ac75f-87b7-485c-ac3b-9993875c8d06\\basil_leaf_1775122012085.png', path.join(publicDir, 'basil-leaf.png'));
console.log('Copy complete');
