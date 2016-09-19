'use strict';

let libPath = require('path');
let libFs = require('fs');
let execSync = require('child_process').execSync;
let mkdirp = require('mkdirp').sync;
let rimraf = require('rimraf').sync;
let config = require('./config.js');
let packages = config.packages;
let infosFilePath = config.infosFilePath;
let installationRoot = config.installationRoot;
let packageJSONTemplatePath = libPath.resolve(libPath.join(__dirname, './package.json.template'));
let packageJSONTemplate = libFs.readFileSync(packageJSONTemplatePath, 'utf-8');

function getPackagesInfos(packages) {
  console.log('Get packages info.');
  return packages.map(pkg => {
    console.log(`\tGet packages info of "${pkg.name}".`);
    let info = execSync(`npm show ${pkg.name} --json`, { encoding: 'utf-8'} );
    return ({ name: pkg.name, info: JSON.parse(info) });
  });
}

function installPackages(packagesInfo, installationRoot) {
  console.log(`\nInstallation started.`);
  packagesInfo.map((info, packageIndex) => {
    let packageRoot =  libPath.join(installationRoot, info.name);
    console.log(`\tCreated "${info.name}" package root dir.`);
    mkdirp(packageRoot);
    info.info.versions.map((version, versionIndex) => {
      let versionRoot = libPath.join(packageRoot, version);
      mkdirp(versionRoot);
      let packageJSONPath = libPath.join(versionRoot, 'package.json');
      execSync(`sleep 1`, { cwd: versionRoot }); // Problem on OSX. On random iter process has stopped;
      libFs.writeFileSync(packageJSONPath, packageJSONTemplate);
      execSync(`npm install --save -E "${info.name}@${version}"`, { cwd: versionRoot });
      removeConflictPackages(libPath.join(versionRoot, 'node_modules', info.name));
      console.log(`\nInstalled ${versionIndex + 1}/${info.info.versions.length} version of "${info.name}" into:`);
      console.log(`\t${versionRoot}`);
      console.log(`Currently installed ${packageIndex}/${packagesInfo.length} packages.`);
    });
    console.log(`\n\nPackage "${info.name}" installed into:`);
    console.log(`\t${packageRoot}`);
    console.log(`Currently installed ${packageIndex + 1}/${packagesInfo.length} packages.`);
  });
}

function removeConflictPackages(packagePath) {
  rimraf(libPath.join(packagePath, 'node_modules', 'react'));
  rimraf(libPath.join(packagePath, 'node_modules', 'react-dom'));
}

// -----------------------------------------------------------------
console.log('Started npm-installer.\n');

mkdirp(installationRoot);
console.log('Created installation root dir.');

rimraf(installationRoot + '/*');
console.log('Cleaned up previous installation.\n');

console.log('root:', config.installationRoot);
mkdirp(config.installationRoot);
let packagesInfos = getPackagesInfos(packages);
libFs.writeFileSync(infosFilePath, `module.exports = ${JSON.stringify(packagesInfos, null, 4)}`);
installPackages(packagesInfos, installationRoot);
console.log(`Installation complete!`);
