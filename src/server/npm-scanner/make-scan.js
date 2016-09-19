'use strict';

let libPath = require('path');
let libFs = require('fs');
let config = require('./config');
let findFiles = require('./utils').findFiles;
let parseDocumentation = require('./parseDocumentation');

function getComponentsInfo(version, versionRoot, componentsMasks) {
  let findedFiles = componentsMasks.reduce((result, mask) => result.concat(findFiles(versionRoot, mask)), []);
  return findedFiles.map(file => {
    let fileContent = libFs.readFileSync(file, 'utf-8');
    let parsedDocumentation = parseDocumentation(fileContent);
    return {
      componentName: parsedDocumentation.componentName,
      version,
      group: parsedDocumentation.group || null,
      demoProps: parsedDocumentation.demoProps
    };
  });
}

function getPackageVersions(packageRoot, packageName) {
  return libFs.readdirSync(packageRoot).map(version => ({
    version: version,
    // versionRoot: libPath.join(packageRoot, version),
    // packageJSONRoot: libPath.join(packageRoot, version, 'node_modules', packageName, 'package.json'),
    components: getComponentsInfo(
      version,
      libPath.join(packageRoot, version, 'node_modules', packageName),
      config.readmeFiles.components
    )
  }))
}

function scanInstalledPackages(installationRoot) {
  let packages = libFs.readdirSync(installationRoot);
  return packages.map(packageName => ({
    name: packageName,
    versions: getPackageVersions(libPath.join(installationRoot, packageName), packageName)
  }));
}

// ----------------------------------------------------------------------------------
console.log('Scanning started.');

let versionsInfo = scanInstalledPackages(config.installationRoot);
let stringifiedVersionsInfo = JSON.stringify(versionsInfo, null, 2);
let versionsInfoFileContent = `module.exports = ${stringifiedVersionsInfo}`;

console.log(stringifiedVersionsInfo);

libFs.writeFileSync(config.versionsInfoPath, versionsInfoFileContent);

console.log('Scanning complete.')
console.log('Results writed to:');
console.log('\t', config.versionsInfoPath);
