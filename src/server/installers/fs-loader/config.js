'use strict';

let libPath = require('path');
let tmpDirPath = libPath.join(__dirname, '../../tmp');

module.exports = {
  readmeFileMask: /README.md$/i,
  componentFileMask: /.react.js$/i,
  componentsPaths: [
    libPath.resolve(
      libPath.join(__dirname, '../../client')
    )
  ],
  tmpDirPath,
  componentsResultsPath: libPath.resolve(
    libPath.join(tmpDirPath, 'components.js')
  )
};
