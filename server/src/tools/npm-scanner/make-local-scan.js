'use strict';

let fs = require('fs');
let fse = require('fs-extra');
let path = require('path');
let glob = require('glob').sync;
let defaultConfig = require('./config');
let getComponentsInfo = require('./make-scan').getComponentsInfo;

let walkUpAndFind = (directory, fileName) => {
  let files = fs.readdirSync(directory);
  let isTargetInDirectory = files.find(file => file === fileName);
  if(typeof isTargetInDirectory !== 'undefined') {
    return directory;
  }
  let upperDirectory = path.resolve(directory, '..');
  return walkUpAndFind(upperDirectory, fileName);
};

module.exports = function (startDirectory) {
  let homeDirectory = walkUpAndFind(startDirectory, 'package.json');
  if(homeDirectory) {
    return homeDirectory;
  }
  throw new Error('Cant find app home directory');
};

function isFileExists(path) {
  return glob(path).length;
}

function getScanResults(componentsRoot, config) {
  let cfg = config || {};
  let readmeMasks = cfg.readmeFileMasks || defaultConfig.readmeFiles.components;
  let componentClassFileSuffix = cfg.componentClassFileSuffix || '.react.js';
  let scopeFileSuffix = cfg.scopeClassFileSuffix || '.scope.react.js';

  let packageRoot = walkUpAndFind(componentsRoot, 'package.json');
  let packageInfo = require(path.join(packageRoot, 'package.json'));

  let componentsInfo = getComponentsInfo(packageInfo.name, packageInfo.version, componentsRoot, readmeMasks)
    .map(componentInfo => {
      let componentRoot = path.dirname(componentInfo.relatedFiles.find(file => file.name === 'readme').path);
      let componentClassPath = path.join(componentRoot, `${componentInfo.name}${componentClassFileSuffix}`);
      let scopeFilePath = path.join(componentRoot, `${componentInfo.name}${scopeFileSuffix}`);
      let additionalComponentInfo = {};
      if (isFileExists(componentClassPath)) {
        additionalComponentInfo.componentClassPath = componentClassPath;
      }
      if (isFileExists(scopeFilePath)) {
        additionalComponentInfo.scopeFilePath = scopeFilePath;
      }
      return Object.assign({}, componentInfo, additionalComponentInfo);
    });

  return {
    componentsInfo: componentsInfo,
    packagesInfo: [packageInfo]
  };
}

function makeLocalScan(componentsRoot, destination, config) {
  let packageRoot = walkUpAndFind(componentsRoot, 'package.json');
  let resultsDestination = destination || path.join(packageRoot, 'node_modules', '.jcatalog-showroom');
  let scanResults = getScanResults(componentsRoot, config);
  Object.keys(scanResults).map(scanResult => {
    let fileContent = `module.exports = ${JSON.stringify(scanResults[scanResult], null, 4)}`;
    let filePath = path.join(resultsDestination, `${scanResult}.js`);
    fse.outputFileSync(filePath, fileContent);
  });
}

let result = makeLocalScan('D:\\work\\js-react-reference-search\\src\\client');
