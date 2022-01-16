const fs = require('fs');
const path = require('path');



const componentName = process.argv[2];
const pathToComponents =  path.resolve('src','components');
const pathToComponent = path.resolve(pathToComponents, componentName);


// Exists check
if(!fs.existsSync(pathToComponent)) throw new Error('Component no exist!');

// Remove Conponent Folder
fs.rmdirSync( pathToComponent, {recursive: true});



