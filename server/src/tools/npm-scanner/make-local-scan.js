'use strict';

let fs = require('fs');
let fse = require('fs-extra');
let path = require('path');
let glob = require('glob').sync;
let defaultConfig = require('./config');
let getComponentsInfo = require('./make-scan').getComponentsInfo;
let addRequiresStrings = require('./utils').addRequiresStrings;

let walkUpAndFind = (directory, fileName) => {
  let files = fs.readdirSync(directory);
  let isTargetInDirectory = files.find(file => file === fileName);
  if (typeof isTargetInDirectory !== 'undefined') {
    return directory;
  }
  let upperDirectory = path.resolve(directory, '..');
  return walkUpAndFind(upperDirectory, fileName);
};

function isFileExists(packageRoot, relativePath) {
  let targetPath = path.resolve(
    path.join(packageRoot, 'node_modules/@opuscapita', '.showroom'),
    relativePath
  );
  return glob(targetPath).length;
}

function getScanResults(componentsRoot, config) {
  let cfg = config || {};
  let readmeMasks = cfg.readmeFileMasks || defaultConfig.readmeFiles.components;
  // let componentClassFileSuffix = cfg.componentClassFileSuffix || '.react.js';
  let scopeClassSuffix = cfg.scopeClassClassSuffix || '.scope.react.js';

  let packageRoot = walkUpAndFind(componentsRoot, 'package.json');
  let packageInfo = require(path.join(packageRoot, 'package.json'));

  let componentsInfo = getComponentsInfo(packageInfo.name, packageInfo.version, componentsRoot, readmeMasks).
    map(componentInfo => {
      let componentRoot = path.dirname(componentInfo.relatedFiles.find(file => file.name === 'readme').path);
      // let componentClass = path.normalize('../../' +
      //   path.relative(packageRoot, path.join(componentRoot, `${componentInfo.name}${componentClassFileSuffix}`)
      // ));
      let scopeClass = path.normalize('../../' +
        path.relative(packageRoot, path.join(componentRoot, `${componentInfo.name}${scopeClassSuffix}`)
      ));
      let relativedRelatedFiles = componentInfo.relatedFiles.map(relatedFile =>
        Object.assign(
          {},
          relatedFile,
          { content: path.normalize('../../' + path.relative(packageRoot, relatedFile.path)) }
        )
      );
      const newComponentInfo = Object.assign({}, componentInfo, { relatedFiles: relativedRelatedFiles });
      let additionalComponentInfo = {};
      if (isFileExists(packageRoot, newComponentInfo)) {
        additionalComponentInfo.componentClass = newComponentInfo;
      }
      if (isFileExists(packageRoot, scopeClass)) {
        additionalComponentInfo.scopeClass = scopeClass;
      }
      return Object.assign({}, newComponentInfo, additionalComponentInfo);
    });

  return {
    componentsInfo: componentsInfo,
    packageInfo: [packageInfo]
  };
}

function makeLocalScan(componentsRoot, destination, config) {
  let packageRoot = walkUpAndFind(componentsRoot, 'package.json');
  let resultsDestination = destination || path.join(packageRoot, 'node_modules', '.jcatalog-showroom');
  let scanResults = getScanResults(componentsRoot, config);
  Object.keys(scanResults).map(scanResult => {
    let fileContent;
    let filePath = path.join(resultsDestination, `${scanResult}.js`);
    if (scanResult === 'componentsInfo') {
      fileContent = addRequiresStrings(scanResults[scanResult])
    } else {
      fileContent = `module.exports = ${JSON.stringify(scanResults[scanResult], null, 4)}`;
    }
    fse.outputFileSync(filePath, fileContent);
  });
  let packageJsonTemplate = fs.readFileSync(path.resolve(__dirname, './package.json.template'), 'utf-8');
  let packageJsonPath = path.join(resultsDestination, 'package.json');
  // let packageRootInfoPath = path.join(resultsDestination, 'packageRoot');
  fse.outputFileSync(packageJsonPath, packageJsonTemplate);
}

module.exports = {
  default: makeLocalScan
};
