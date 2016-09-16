//extend webpack.config.js
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var env = process.env.NODE_ENV || 'development';

config.devtool = 'cheap-eval-source-map';

//inject hot reload on development server
config.entry.app.push('webpack/hot/dev-server', 'webpack-hot-middleware/client');

config.module.loaders.push({
  test: /\.(scss)$/,
  exclude: /node_modules/,
  loader: 'style-loader!css!postcss!sass!'
});

config.plugins.push(
  new HtmlWebpackPlugin({
    template: path.resolve('src/index.html'),
    inject: true
  })
);

module.exports = config;
