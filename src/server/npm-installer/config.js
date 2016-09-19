'use strict';

let libPath = require('path');

module.exports = {
  packages: [
    {
      name: 'react-slider'
    },
    {
      name: 'react-button'
    }
  ],
  installationRoot: libPath.resolve(libPath.join(__dirname, '../tmp/npm-installer/packages')),
  infosFilePath: libPath.resolve(libPath.join(__dirname, '../tmp/npm-installer/infos.js'))
};
