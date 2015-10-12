var path = require('path');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: ['./src/js/app.js'],

  output: {
    path: path.resolve('dist'),
    publicPath: 'build',
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: 'public',

    // hot: true,
    stats: {
      colors: true
    }
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
      //embeded require css into html
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract("style", "css")
      },
      //parse .scss into css
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract("style", "css!sass")
      },
      {
        test: /\.(eot|otf|ttf)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=10000&name=fonts/[hash].[ext]'
      },
      //bundle any files within limit of 10kb into bundle.js,
      //if more than limit it will be a separate network request
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=10000&name=images/[name].[ext]'
      }
    ]
  },

  plugins: [
       new ExtractTextPlugin("css/styles.css")
   ],

  //allow require without file extension
  resolve: {
    extensions: ['', '.js', '.es6']
  }
}
