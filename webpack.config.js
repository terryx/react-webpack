var path = require('path');
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');

module.exports = {
  //entry, output, and development server contains in webpack.development.config.js
  entry: {
    app: [path.resolve('src/js/app')],
    vendors: ['react', 'react-dom']
  },

  //loaders are webpack essential tool to bundle files
  module: {
    preLoaders: [
      //javascript linter
      {
        test: /\.(js|jsx|es6)$/,
        exclude: /node_modules/,
        loader: 'eslint'
      },
    ],
    loaders: [
      //transpile es6 to es5
      {
        test: /\.(js|jsx|es6)$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      //parse .scss into css
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract("style", "css!postcss!sass!")
      },
      //bundle any files within limit of 10kb into bundle.js,
      //if more than limit it will be a separate network request
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        loader: 'url?limit=10000&name=images/[name].[ext]'
      }, {
        test: /\.(eot|otf|ttf)$/,
        exclude: /node_modules/,
        loader: 'url?limit=10000&name=fonts/[name].[ext]'
      }
    ]
  },

  //add autoprefixer to support css of older browser version
  postcss: [autoprefixer({
    browsers: ['last 2 versions']
  })],

  plugins: [
    new ExtractTextPlugin("css/styles.[hash].css"),
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      template: './src/index.html',
      inject: 'body'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.[hash].js')
  ],

  //allow require without file extension
  resolve: {
    extensions: ['', '.js', '.es6', '.jsx']
  }
}
