'use strict';

let libPath = require('path');
let libFs = require('fs');
let findFiles = require('./utils').findFiles;
let parseDocumentation = require('./parseDocumentation');

function getComponentsInfo(packageName, version, versionRoot, componentsMasks) {
  let findedFiles = componentsMasks.reduce((result, mask) => result.concat(findFiles(versionRoot, mask)), []);
  return findedFiles.map(file => {
    let fileContent = libFs.readFileSync(file, 'utf-8');
    let parsedDocumentation = parseDocumentation(fileContent);
    let readmePath = libPath.resolve(versionRoot, file);
    return {
      "package": packageName,
      name: parsedDocumentation.componentName,
      version,
      tags: parsedDocumentation.tags || '',
      relatedFiles: [{
        name: 'readme',
        path: readmePath
      }]
    };
  });
}

function getPackageVersions(packageRoot, packageName, config) {
  return libFs.readdirSync(packageRoot).reduce((result, version) =>
    result.concat(getComponentsInfo(
      packageName,
      version,
      libPath.join(packageRoot, version, 'node_modules', packageName),
       config.readmeFiles.components
    )), []
  )
}

function scanInstalledPackages(config) {
  let installationRoot = config.installationRoot;
  let packages = libFs.readdirSync(installationRoot);
  return packages.reduce((result, packageName) =>
    result.concat(getPackageVersions(libPath.join(installationRoot, packageName), packageName, config))
  , []);
}

function makeScan(config) {
  console.log('Scanning started.');

  let componentsInfo = scanInstalledPackages(config);
  let stringifiedVersionsInfo = JSON.stringify(componentsInfo, null, 2);
  let componentsInfoFileContent = `module.exports = ${stringifiedVersionsInfo}`;

  console.log(stringifiedVersionsInfo);

  libFs.writeFileSync(config.componentsInfoPath, componentsInfoFileContent);

  console.log('Scanning complete.');
  console.log('Results writed to:');
  console.log('\t', config.componentsInfoPath);
}

module.exports = {
  default: makeScan,
  getComponentsInfo: getComponentsInfo
};
