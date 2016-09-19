'use strict';

let libPath = require('path');
let semver = require('semver');

module.exports = {
  packages: [
    {
      name: 'react-button',
      versionsFilter: version => semver.gt(version, '1.1.1')
    },
    {
      name: 'react-slick',
      versionsFilter: (version, index, arr) => index > (arr.length - 3)
    }
  ],
  installationRoot: libPath.resolve(libPath.join(__dirname, '../tmp/npm-installer/packages')),
  packagesInfoPath: libPath.resolve(libPath.join(__dirname, '../tmp/npm-installer/packages-info.js'))
};
