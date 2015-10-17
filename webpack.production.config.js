//extend webpack.config.js
var config = require('./webpack.config');
var WebpackStrip = require('strip-loader');
var path = require('path');

//remove accidental console.log message in production code
var stripLoader = {
  test: [/\.js$/, /\.jsx$/],
  exclude: /node_modules/,
  loader: WebpackStrip.loader('console.log')
}

//for more info, look into webpack.config.js
//this will add a new object into default settings
config.entry = [
  path.resolve('src/js/app')
],

config.output = {
  path: path.resolve('release'),
  filename: 'app.[hash].js',
  publicPath: '/'
},

config.module.loaders.push(stripLoader)

module.exports = config;
