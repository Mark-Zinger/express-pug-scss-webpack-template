const fs = require('fs');
const path = require('path');

function generateDataObj () {

    const dataPath = path.join('src', 'data');
    const dataJson = {};
    try {
        fs.readdirSync(dataPath).forEach((file) => {
            if (file.indexOf('.json') !== -1) {
                const fileName = file.slice(0, file.indexOf('.json'));

                try {
                    dataJson[fileName] = JSON.parse(
                        fs.readFileSync(path.join(dataPath, file))
                    );
                } catch (e) {
                    console.log(
                        `['ERROR'] ${file}: ${ e.message }`
                    );
                }
            } else {
                console.log(
                    `['ERROR'] Ошибка загрузки, файл ${file} имеет неверное расширение`
                );
            }
        });
    } catch (e) {
        console.log(`['ERROR'] ${e.message}`);
    }
        
    return dataJson;
}


module.exports = generateDataObj;