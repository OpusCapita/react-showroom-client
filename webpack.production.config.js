'use strict';
const path = require('path');
const webpack = require('webpack');

let config = require('./webpack.development.config');
config.entry = path.resolve(path.join(__dirname, './src/client/index.js'));
config.externals = {
  'react': 'React'
};
delete config.devtool;
config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': '"production"'
    }
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    comments: false
  })
]);

module.exports = config;
