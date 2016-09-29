'use strict';
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');

let config = require('./webpack.development.config');
config.entry = path.resolve(path.join(__dirname, './src/client/index.js'));
config.plugins = config.plugins.concat([
  new WriteFilePlugin()
]);

module.exports = config;
