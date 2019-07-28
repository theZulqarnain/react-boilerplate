const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    entry: './src/index.js',
    // entry: ['babel-polyfill', './src/app.js'],
    
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
                
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            sourceMap: true,
                          },
                      },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            
                        }
                    }
                ]
            },
            {
                test: /\.(gif|svg|jpg|png|ttf|ico|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            favicon: './public/images/fav.ico',
        }),
        new webpack.DefinePlugin({
            'process.env': {
            'NODE_ENV': JSON.stringify('development'),
            'CONF_MODE':JSON.stringify('local')
            }
          }),
          new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
          }),
      
    ],
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
        host:'0.0.0.0',
        disableHostCheck: true,
        overlay:true
    }
};
