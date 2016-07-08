/* eslint max-len: 0 */
import webpack from 'webpack';
import baseConfig from './webpack.config.base';

var ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
  ...baseConfig,

  debug: true,

  devtool: 'cheap-module-eval-source-map',

  entry: [
    'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
    './app/index'
  ],

  output: {
    ...baseConfig.output,
    publicPath: 'http://localhost:3000/dist/'
  },

  module: baseConfig.module,


  plugins: [
    ...baseConfig.plugins,
    new ExtractTextPlugin('style.css', {allChunks: true}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],

  target: 'electron-renderer'
};

export default config;