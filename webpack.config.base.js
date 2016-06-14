import path from 'path';
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var postcssImport = require('postcss-import');
var autoprefixer = require('autoprefixer');
var postcssReporter = require('postcss-reporter');
var cssnext = require("postcss-cssnext");
var postcssMixins = require('postcss-mixins');

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
    name: 'fonts/[name]_[hash].[ext]'
  }
};

var scssLoader = {
  test: /(\.scss)$/,
  loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap')
}

var cssLoader = {
  test: /(\.css)$/,
  loader: ExtractTextPlugin.extract('style', 'css!postcss')
}

var postCSSConfig = function() {
  return [
    postcssImport({
      path: path.join(__dirname, './app', 'styles'),
      addDependencyTo: webpack
    }),
    postcssMixins(),
    cssnext(),
    postcssReporter({clearMessages:true})
  ];
};

export default {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, 
    imgLoader,
    fontsLoader,
    scssLoader,
    cssLoader,
    {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  plugins: [

  ],
  externals: [
    // put your node 3rd party libraries which can't be built with webpack here
    // (mysql, mongodb, and so on..)
  ],
  postcss: postCSSConfig
};