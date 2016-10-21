'use strict';

let libPath = require('path');
let semver = require('semver');

module.exports = {
  packages: [
    {
      name: 'test-showroom-activity',
      versionsFilter: version => semver.gt(version, '1.0.2')
    },
    {
      name: 'test-showroom-jcatalog-react-reference-search',
      versionsFilter: version => semver.gt(version, '2.3.3')
    },
    {
      name: 'test-showroom-jcatalog-react-user-profile',
      versionsFilter: version => semver.gt(version, '1.0.7')
    }
  ],
  installationRoot: libPath.resolve(libPath.join(__dirname, '../../tmp/npm-installer/packages')),
  packagesInfoPath: libPath.resolve(libPath.join(__dirname, '../../tmp/npm-installer/packages-info.js'))
};
