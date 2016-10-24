'use strict';
const path = require('path');
const webpack = require('webpack');

let config = require('./webpack.development.config.js');
config.entry = path.resolve(path.join(__dirname, 'src', 'index.js'));
delete config.devtool;
delete config.watch;
delete config.output.publicPath;
config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': '"production"'
    }
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false,
      screw_ie8: true
    },
    comments: false
  })
]);

module.exports = config;
