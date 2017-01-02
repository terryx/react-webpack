module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        'Chrome >= 30',
        'Firefox >= 20',
        'IOS >= 6',
        'Android >= 4.0',
        'FirefoxAndroid >= 30',
        'OperaMobile >= 12',
        'Samsung >= 4'
      ]
    })
  ]
}
