'use strict';

let libPath = require('path');
let libFs = require('fs');

function getPackage(installationRoot, packageName, packageVersion, onRead) {
  let packageBundlePath = libPath.resolve(
    libPath.join(
      installationRoot,
      packageName,
      packageVersion,
      'bundle.js'
    )
  );
  let packageIndexFileContent;
  try {
    packageIndexFileContent = libFs.readFile(packageBundlePath, 'utf-8', onRead);
  } catch (err) {
    console.log('There is no package on this path:', packageBundlePath);
    console.log(err);
  }
  return packageIndexFileContent;
}

module.exports = {
  getPackage
};
