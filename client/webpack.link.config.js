'use strict';
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');

let config = require('./webpack.development.config.js');
config.entry = path.resolve(path.join(__dirname, './src/index.js'));
config.plugins = config.plugins.concat([
  new WriteFilePlugin()
]);

module.exports = config;
