const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
// const proxyMiddleware = require('http-proxy-middleware');

const webpackConfig = require('./webpack.config.dev');
const pkg = require('./package');
const bundler = webpack(webpackConfig);
// const proxy = proxyMiddleware('', {
//   target: '',
//   changeOrigin: true
// });

browserSync({
  open: false,
  port: 8080,
  ghostMode: {
    clicks: true,
    forms: true,
    scroll: true
  },
  logLevel: 'info',
  logPrefix: pkg.name,
  logConnections: true,
  logFileChanges: true,
  logSnippet: true,
  browser: ['google chrome'],
  reloadOnRestart: false,
  notify: true,
  scrollThrottle: 100,
  injectChanges: true,
  server: {
    baseDir: 'src',

    middleware: [
      // proxy,
      webpackDevMiddleware(bundler, {
        // IMPORTANT: dev middleware can't access config, so we should
        // provide publicPath by ourselves
        publicPath: webpackConfig.output.publicPath,

        // pretty colored output
        stats: {
          assets: false,
          colors: true,
          version: false,
          hash: false,
          timings: false,
          chunks: false,
          chunkModules: false
        }
        // for other settings see
        // http://webpack.github.io/docs/webpack-dev-middleware.html
      }),

      // bundler should be the same as above
      webpackHotMiddleware(bundler)
    ]
  },
  files: [
    'src/*.html',
    'src/css/**'
  ]
});
