const path = require('path');
var cssnext = require("postcss-cssnext");
var postcssReporter = require('postcss-reporter');

var postCSSConfig = function() {
  return [
    cssnext(),
    postcssReporter({clearMessages:true})
  ];
};

var jsLoader = {
  test: /\.js$|\.jsx$/,
  loaders: ['babel-loader'],
  include: path.join(__dirname, '..', 'src'),
  exclude: path.join(__dirname, '..', 'node_modules')
};

var scssLoader = {
  test: /(\.scss)$/,
  loaders: ['style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap!toolbox'],
  include: path.resolve(__dirname, '../')
};

var cssLoader = {
  test: /(\.css)$/,
  loaders: ['style', 'css'],
  include: path.resolve(__dirname, '../')
};


var imgLoader = {
  test: /\.(png|jpg|jpeg|gif|svg)$/,
  loader: 'url',
  query: {
    name: 'images/[name]_[hash].[ext]',
    limit: 100000,
  }
};

var fontsLoader = {
  test: /\.(|woff|woff2|eot|ttf|eot)$/,
  loader: 'file',
  query: {
    name: 'fonts/[name]_[hash].[ext]',
  }
};

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
    modulesDirectories: [
      'src', 'node_modules'
    ]
  },
  module: {
    context: path.join(__dirname, '..', 'app'),
    loaders: [jsLoader, cssLoader, scssLoader, fontsLoader, imgLoader],
  },

  postcss: postCSSConfig
};
