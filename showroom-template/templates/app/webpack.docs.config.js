'use strict';
const webpack = require('webpack');

let config = require('./webpack.development.config.js');
delete config.devtool;
delete config.output.publicPath;
delete config.watch;
config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true
    },
    comments: false
  })
]);

module.exports = config;
