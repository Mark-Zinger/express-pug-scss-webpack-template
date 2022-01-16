const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const generateHtmlPlugins = require("./src/helpers/generateHtmlPlugins");

  
  
const htmlPlugins = generateHtmlPlugins('./src/pages/');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: {
        scripts: './src/index.js',
    },
    output: {
        filename: '[name].[contenthash].js',
        assetModuleFilename: "assets/[hash][ext][query]",
        clean: true,
    },
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        ...htmlPlugins
    ],
    module: {
        rules: [
            {
            test: /\.html$/i,
            loader: "html-loader",
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    (process.env.NODE_ENV === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
                        {
                test: /\.pug$/,
                use: [
                    { loader: 'html-loader'}, 
                    {
                        loader: 'pug-html-loader',
                        options: { exports: false }
                    }
                ],
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },

            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
}