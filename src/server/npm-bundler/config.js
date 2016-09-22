'use strict';

let libPath = require('path');

module.exports = {
  installationRoot: libPath.resolve(libPath.join(__dirname, '../tmp/npm-installer/packages')),
  packagesInfoPath: libPath.resolve(libPath.join(__dirname, '../tmp/npm-installer/packages-info.js')),
  webpackConfigPath: libPath.resolve(libPath.join(__dirname, './webpack.config.js'))
};
