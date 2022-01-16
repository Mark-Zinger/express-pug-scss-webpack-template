const fs = require('fs');
const path = require('path');


const pathToComponents =  path.resolve('src','components');
const pathToSCSS_Components = path.resolve('src','styles','_components.scss');
const pathToPUG_Components = path.resolve('src','pug','_components.pug');

// Exists check
if(!fs.existsSync(pathToComponents)) throw new Error('Components Folder no exist!');

const components = fs.readdirSync(pathToComponents);

// Generate _component files
const SCSS_AllComponents = components.reduce((prev, current) => `${prev}@import '../components/${current}/${current}';\n`,'')
const PUG_AllComponents = components.reduce((prev, current) => `${prev}include ../components/${current}/${current}\n`,'')

// Write _components files
fs.writeFileSync(pathToSCSS_Components, SCSS_AllComponents);
fs.writeFileSync(pathToPUG_Components, PUG_AllComponents);
