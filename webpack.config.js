var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpackConfig = {
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()]
}

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  // context: 'src',
  entry: ['./src/js/app'],

  output: {
    path: path.resolve('build'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  devServer: {
    contentBase: 'src',
    stats: {
      colors: true
    },
    quiet: true,
    hot: true
  },

  //loaders are webpack essential tool to bundle files
  module: {
    loaders: [
      //transpile es6 to es5
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      //parse .scss into css
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract("style", "css!sass")
      },
      //bundle any files within limit of 10kb into bundle.js,
      //if more than limit it will be a separate network request
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=10000&name=images/[name].[ext]'
      }, {
        test: /\.(eot|otf|ttf)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=10000&name=fonts/[name].[ext]'
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin("css/styles.css"),
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ],

  //allow require without file extension
  resolve: {
    extensions: ['', '.js', '.es6']
  }
}
