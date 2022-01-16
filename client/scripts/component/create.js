const fs = require('fs');
const path = require('path');

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeDashes(string) {
    return string.replaceAll('-','')
}

function toJSClassName (string) {
    return removeDashes(capitalizeFirstLetter(string));
}

const newComponentName = process.argv[2];
const pathToComponents =  path.resolve('src','components');
const pathToNewComponent = path.resolve(pathToComponents, newComponentName);

const componentJS = fs.readFileSync(path.resolve(__dirname, 'component.js.template'), 'utf-8')
    .replaceAll('componentName', toJSClassName(newComponentName));

const componentPUG = fs.readFileSync(path.resolve(__dirname, 'component.pug.template'), 'utf-8')
    .replaceAll('componentName', newComponentName);

const componentSCSS = fs.readFileSync(path.resolve(__dirname, 'component.scss.template'), 'utf-8')
    .replaceAll('componentName', newComponentName);



// Exists check
if(fs.existsSync(pathToNewComponent)) throw new Error('Component already exist!');

// Make Conponent Folder
fs.mkdirSync(pathToNewComponent,{recursive: true})

// Write Component Files
fs.writeFileSync(path.resolve(pathToNewComponent, `${newComponentName}.js`), componentJS);
fs.writeFileSync(path.resolve(pathToNewComponent, `${newComponentName}.pug`), componentPUG);
fs.writeFileSync(path.resolve(pathToNewComponent, `${newComponentName}.scss`), componentSCSS);

console.log(componentSCSS)

