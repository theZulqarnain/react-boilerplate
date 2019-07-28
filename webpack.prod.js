const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const VENDOR_LIBS =['axios','react','react-dom','react-loadable',
                    'react-redux','react-router','react-router-dom','redux','redux-thunk'
];
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var BrotliPlugin = require('brotli-webpack-plugin');

module.exports = {
    entry:{
      vendor: VENDOR_LIBS,
      main: './src/app.js',
    },
  output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        publicPath: '/',
  },
  devtool: 'source-map',
  // resolve: {
  //   alias: {
  //     "@ant-design/icons/lib/dist$": path.join(__dirname, 'src/app.js')
  //   }
  // },  
  module: {
    rules: [
      
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      { test: /\.bundle\.js$/, use: { loader: 'bundle-loader', options: {lazy: true} } },
      {
        test: /\.s?css$/,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader?url=false',
                options: {
                    sourceMap: true,
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            }
            
        ]
    },{
        test: /\.(gif|svg|jpg|png|ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: "file-loader?name=[name].[ext]",
    }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: './src/index.html',
      filename: 'index.html',
      favicon: './public/images/fav.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new WebpackMd5Hash(),
    // new CompressionPlugin({
    //   algorithm: 'gzip',
    //   test : /\.js$|\.css$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
    //   threshold: 10240,
    //   minRatio: 0.8
    // }),
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.js$|\.css$|\.eot?.+$|\.jpg?.+$|\.png?.+$|\.gif?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8
    }),
  
    new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
          'CONF_MODE':JSON.stringify('booking')
        }
      }),
    // new WorkboxPlugin.GenerateSW({
    //       runtimeCaching: [
    //         {
    //             urlPattern: /images/,
    //             handler: 'cacheFirst'
    //         },
    //         {
    //             urlPattern: new RegExp('^https://fonts.(?:googleapis|gstatic).com/(.*)'),
    //             handler: 'cacheFirst'
    //         },
    //         {
    //             urlPattern: /.*/,
    //             handler: 'cacheFirst'
    //         }
    //     ]
    //     }),
        new CopyWebpackPlugin([
        //   {from:'public/images/bg.png',to:'images/bg.png'}, 
        //   {from:'public/images/mobo_bg.png',to:'images/mobo_bg.png'}, 
      ]),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // new BundleAnalyzerPlugin(),
  ],
  optimization: {
    splitChunks: {
        cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
          chunks: 'all',
          minChunks: 2
        },
      }
    },
    runtimeChunk: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
  },
};
