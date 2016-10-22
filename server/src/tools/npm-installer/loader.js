'use strict';

let libPath = require('path');
let libFs = require('fs');

function getPackage(installationRoot, packageName, packageVersion, onRead) {
  let bundlePath = libPath.resolve(
    libPath.join(
      installationRoot,
      packageName,
      packageVersion,
      'bundle.js'
    )
  );
  try {
    libFs.readFile(bundlePath, 'utf-8', onRead);
  } catch (err) {
    console.log('There is no package on this path:', bundlePath);
    console.log(err);
  }
}

function getRelatedFile(filePath, onRead) {
  try {
    libFs.readFile(filePath, 'utf-8', onRead);
  } catch (err) {
    console.log('There is no package on this path:', filePath);
    console.log(err);
  }
}

module.exports = {
  getPackage,
  getRelatedFile
};
