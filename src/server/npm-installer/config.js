'use strict';

let libPath = require('path');
let semver = require('semver');

module.exports = {
  packages: [
    {
      name: 'react-slider',
      versionsFilter: version => semver.gt(version, '0.5.0')
    },
    {
      name: 'react-button',
      versionsFilter: version => semver.gt(version, '1.1.0')
    }
  ],
  installationRoot: libPath.resolve(libPath.join(__dirname, '../tmp/npm-installer/packages')),
  infosFilePath: libPath.resolve(libPath.join(__dirname, '../tmp/npm-installer/infos.js'))
};
