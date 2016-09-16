//extend webpack.config.js
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

config.devtool = 'source-map';

//remove accidental console.log message in production code
config.module.loaders.push({
  test: /\.(scss)$/,
  exclude: /node_modules/,
  loader: ExtractTextPlugin.extract('style-loader', 'css!postcss!sass!')
});

config.plugins.push(
  new CleanWebpackPlugin(['dist'], {
    root: __dirname,
    verbose: true,
    dry: false
  }),
  new ExtractTextPlugin("[name].css", {
    allChunks: true
  }),
  new HtmlWebpackPlugin({
    filename: 'index.stg.html',
    template: path.resolve('src/index.stg.html'),
    inject: true,
    hash: true,
    cache: true,
    minify: {
      collapseWhitespace: false,
      removeComments: true,
      minifyJS: false
    }
  }),
  new HtmlWebpackPlugin({
    filename: 'index.prd.html',
    template: path.resolve('src/index.prd.html'),
    inject: true,
    hash: true,
    cache: true,
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      minifyJS: true
    }
  }),
  new webpack.DefinePlugin({
    "process.env": {
      // This has effect on the react lib size
      "NODE_ENV": JSON.stringify("production")
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false
    },
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.DedupePlugin()
);

module.exports = config;
