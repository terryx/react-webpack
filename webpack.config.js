const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const { ifDevelopment, ifProduction } = getIfUtils(process.env.NODE_ENV);

module.exports = {
  context: resolve('src'),

  //entry, output, and development server contains in webpack.development.config.js
  entry: {
    vendor: ['react', 'react-dom'],
    app: removeEmpty([
      ifDevelopment('react-hot-loader/patch'),
      ifDevelopment('webpack-dev-server/client?http://localhost:8080'),
      ifDevelopment('webpack/hot/only-dev-server'),
      './js/index.jsx'
    ])
  },

  output: {
    filename: ifProduction('[chunkhash].[name].js', '[name].js'),
    path: resolve('dist'),
    publicPath: '/'
  },

  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/',
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  },

  devtool: ifProduction('source-map', 'cheap-eval-source-map'),

  performance: {
    hints: false
  },

  //loaders are webpack essential tool to bundle files
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: ['eslint-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(styl)$/,
        loaders: ifProduction(
          ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: ['css-loader?-minimize', 'stylus-loader']
          }),
          ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader']
        )
      },
    ]
  },

  plugins: removeEmpty([
    //PRODUCTION
    ifProduction(new ExtractTextPlugin('[chunkhash].[name].css')),
    ifProduction(
      new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      }
    })),
    ifProduction(new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    })),
    ifProduction(new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './prod.html',
      inject: true,
      hash: true
    })),

    //DEVELOPMENT
    ifDevelopment(new webpack.HotModuleReplacementPlugin()),
    ifDevelopment(new webpack.NamedModulesPlugin()),
    ifDevelopment(new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './dev.html',
      inject: true,
      false: true
    })),

    //DEFAULT
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new webpack.NoErrorsPlugin(),
  ]),

  resolve: {
    modules: ['node_modules', resolve('src/js')],
    extensions: ['.js', '.es6', '.jsx']
  }
}
