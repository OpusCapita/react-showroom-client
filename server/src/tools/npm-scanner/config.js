'use strict';

let libPath = require('path');

module.exports = {
  installationRoot: libPath.resolve(libPath.join(__dirname, '../../../tmp/npm-installer/packages')),
  packagesInfoPath: libPath.resolve(libPath.join(__dirname, '../../../tmp/npm-installer/packages-info.js')),
  componentsInfoPath: libPath.resolve(libPath.join(__dirname, '../../../tmp/npm-installer/components-info.js')),
  readmeFiles: {
    components: [/docs\.md$/i, /documentation\.md$/i],
    other: [/(^docs)\.md$/i]
  }
};
