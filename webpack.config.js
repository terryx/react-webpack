var path = require('path');

module.exports = {
  entry: ['./js/app.js'],

  output: {
    path: path.resolve('public/assets/'),
    publicPath: 'assets/',
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
        loader: 'style-loader!css-loader',
      },
      //parse .scss into css
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!sass-loader',
      },
      //bundle any files within limit of 10kb into bundle.js,
      //if more than limit it will be a separate network request
      {
        test: /\.(png|jpg|ttf|eot|otf|ttf)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=10000'
      }
    ]
  },

  //allow require without file extension
  resolve: {
    extensions: ['', '.js', '.es6']
  }
}
