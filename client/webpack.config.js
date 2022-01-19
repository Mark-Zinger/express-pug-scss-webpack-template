const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const generateHtmlPlugins = require("./src/helpers/generateHtmlPlugins");
const generateDataObj = require('./src/helpers/generateDataObj');
  
  
const htmlPlugins = generateHtmlPlugins('./src/pages/');
const data = generateDataObj();


module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: '[name].js',
        assetModuleFilename: 'assets/[name][ext]',
        clean: true
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{ from: 'src/images', to: 'assets'}]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        ...htmlPlugins,

    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    // Disables attributes processing
                    sources: false
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            // Options
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            // Disables attributes processing
                            sources: false
                        }
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            exports: true,
                            data: { data }
                        }
                    }
                ],
                exclude: /(node_modules|bower_components)/
            },
            // {
            //     test: /\.(png|svg|jpg|jpeg|gif)$/i,
            //     type: 'asset/resource'
            // },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource'
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
    }
};