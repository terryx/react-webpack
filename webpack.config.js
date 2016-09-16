const path = require('path');
const webpack = require('webpack')
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  //entry, output, and development server contains in webpack.development.config.js
  entry: {
    app: [path.resolve('src/js/app')],
    vendor: ['react', 'react-dom']
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
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
      //if more than limit it will be a separate network request
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        loader: 'url?limit=100&name=img/[name].[ext]'
      },
    ]
  },

  //add autoprefixer to support css of older browser version
  postcss: [autoprefixer({
    browsers: ['last 2 versions']
  })],

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new CopyWebpackPlugin([{
      from: './src/img',
      to: 'img'
    }])
  ],

  resolve: {
    modulesDirectories: ['node_modules', path.join(__dirname, 'src', 'js')],
    extensions: ['', '.js', '.es6', '.jsx']
  }
}
