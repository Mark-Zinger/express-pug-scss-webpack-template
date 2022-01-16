const fs = require('fs');
const path  = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


function generateHtmlPlugins (templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(templateDir))
    return templateFiles.map(item => {
      // Split names and extension
      const parts = item.split('.')
      const name = parts[0]
      const extension = parts[1]
      return new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: path.resolve(`${templateDir}/${name}.${extension}`)
      })
    })
}


module.exports = generateHtmlPlugins;