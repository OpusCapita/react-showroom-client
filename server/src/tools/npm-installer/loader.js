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

function getRelatedFile(installationRoot, packageName, packageVersion, relativePath, onRead) {
  let relateFilePath = libPath.resolve(
    libPath.join(
      installationRoot,
      packageName,
      packageVersion,
      'node_modules',
      packageName,
      relativePath
    )
  );
  console.log(relateFilePath);
  try {
    libFs.readFile(relateFilePath, 'utf-8', onRead);
  } catch (err) {
    console.log('There is no package on this path:', relateFilePath);
    console.log(err);
  }
}

module.exports = {
  getPackage,
  getRelatedFile
};
