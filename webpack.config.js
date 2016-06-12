var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var postcssImport = require('postcss-import');
var autoprefixer = require('autoprefixer');
var postcssReporter = require('postcss-reporter');
var cssnext = require("postcss-cssnext");
var postcssMixins = require('postcss-mixins');

var scssLoader = {
  test: /(\.scss)$/,
  loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap')
};

var cssLoader = {
  test: /(\.css)$/,
  loader: ExtractTextPlugin.extract('style', 'css!postcss')
};

var postCSSConfig = function() {
  return [
    postcssImport({
      path: path.join(__dirname, 'src', 'styles'),
      addDependencyTo: webpack
    }),
    postcssMixins(),
    cssnext(),
    postcssReporter({clearMessages:true})
  ];
};

module.exports = {
  //devtool: 'cheap-module-eval-source-map',
  entry: [
    //'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    //'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './src/client'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: 'static/'
  },
  plugins: [
    //new webpack.HotModuleReplacementPlugin(),
    //new webpack.IgnorePlugin(new RegExp("^(fs|path)$")),
    new ExtractTextPlugin('app.css', { allChunks: true }),
    new webpack.NoErrorsPlugin()
  ],
  postcss: postCSSConfig,
  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        loader: 'babel',
        query: {
          presets: ["react-hmre", "es2015", "react", "stage-0"]
        },
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url',
        query: {
          name: 'images/[name]_[hash].[ext]',
          limit: 100000,
        }
      },
      scssLoader,
      cssLoader,
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },
  externals: [
    (function () {
      var IGNORES = [
        'electron'
      ];
      return function (context, request, callback) {
        if (IGNORES.indexOf(request) >= 0) {
          return callback(null, "require('" + request + "')");
        }
        return callback();
      };
    })()
  ]
};
