//extend webpack.config.js
var config = require('./webpack.config');
var path = require('path');

//for more info, look into webpack.config.js
//this will add a new object into default settings
config.entry = [
  path.resolve('src/js/app')
],

config.output = {
  path: path.resolve('release'),
  filename: 'app.js',
  publicPath: '/'
},

module.exports = config;
