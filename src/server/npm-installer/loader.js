'use strict';

let libPath = require('path');
let libFs = require('fs');

function getPackage(installationRoot, packageName, packageVersion) {
  let packageIndexPath = libPath.resolve(
    libPath.join(
      installationRoot,
      packageName,
      packageVersion,
      'bundle.js'
    )
  );
  let packageIndexFileContent;
  try {
    packageIndexFileContent = libFs.readFileSync(packageIndexPath, 'utf-8');
  } catch (err) {
    console.log('There is no package on this path:', packageIndexPath);
    console.log(err);
  }
  return packageIndexFileContent;
}

module.exports = {
  getPackage
};
