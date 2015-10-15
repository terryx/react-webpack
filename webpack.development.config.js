//extend webpack.config.js
var config = require('./webpack.config');
var path = require('path');

//for more info, look into webpack.config.js
//this will add a new object into default settings
config.entry = [
  'webpack/hot/dev-server',
  'webpack-dev-server/client?http://localhost:8080',
  path.resolve('src/js/app')
];

config.output = {
  path: path.resolve('dist'),
  filename: 'app.js',
  publicPath: '/'
};

config.devtool = 'eval',

config.devServer = {
  contentBase: 'src',
  stats: {
    colors: true
  },
  hot: true
};

module.exports = config;
