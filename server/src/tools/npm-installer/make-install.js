'use strict';

let libPath = require('path');
let libFs = require('fs');
let execSync = require('child_process').execSync;
let mkdirp = require('mkdirp').sync;
let rimraf = require('rimraf').sync;
let packageJSONTemplatePath = libPath.resolve(libPath.join(__dirname, './package.json.template'));
let packageJSONTemplate = libFs.readFileSync(packageJSONTemplatePath, 'utf-8');
let log = console.log;

function getPackagesInfos(packages) {
  log('Get packages info.');
  return packages.map(pkg => {
    log(`\tGet packages info of "${pkg.name}".`);
    let info = execSync(`npm show ${pkg.name} --json`, { encoding: 'utf-8' });
    return ({
      name: pkg.name,
      versionsFilter: pkg.versionsFilter || (v => v),
      info: JSON.parse(info)
    });
  });
}

function installPackages(packagesInfo, installationRoot) {
  log(`\nInstallation started.`);
  packagesInfo.map((packageInfo, packageIndex) => {
    let packageRoot = libPath.join(installationRoot, packageInfo.name);
    log(`\tCreated "${packageInfo.name}" package root dir.`);
    mkdirp(packageRoot);
    let versions = typeof packageInfo.info.versions === 'string' ?
      [packageInfo.info.versions].filter(packageInfo.versionsFilter):
      packageInfo.info.versions.filter(packageInfo.versionsFilter);
    versions.map((version, versionIndex) => {
        let versionRoot = libPath.join(packageRoot, version);
        mkdirp(versionRoot);
        let packageJSONPath = libPath.join(versionRoot, 'package.json');
        execSync(`sleep 1`, {cwd: versionRoot}); // Problem on OSX. On random iter process has stopped;
        libFs.writeFileSync(packageJSONPath, packageJSONTemplate);
        execSync(`npm install --save -E ${packageInfo.name}@${version}`, { cwd: versionRoot });
        let installedVersionDir = libPath.join(versionRoot, 'node_modules', packageInfo.name);
        removeConflictPackages(versionRoot);
        removeConflictPackages(installedVersionDir);
        log(`\nInstalled ${versionIndex + 1}/${versions.length} version of "${packageInfo.name}" into:`);
        log(`\t${versionRoot}`);
        log(`Currently installed ${packageIndex}/${packagesInfo.length} packages.`);
      });
    log(`\n\nPackage "${packageInfo.name}" installed into:`);
    log(`\t${packageRoot}`);
    log(`Currently installed ${packageIndex + 1}/${packagesInfo.length} packages.`);
  });
}

function removeConflictPackages(packagePath) {
  rimraf(libPath.join(packagePath, 'node_modules', 'react'));
  rimraf(libPath.join(packagePath, 'node_modules', 'react-dom'));
}

module.exports = function makeInstall(config) {
  let installationRoot = config.installationRoot;
  let packagesInfoPath = config.packagesInfoPath;
  let packagesToInstall = config.packages;
  log('Started npm-installer.\n');

  mkdirp(installationRoot);
  log('Created installation root dir.');

  rimraf(installationRoot + '/*');
  log('Cleaned up previous installation.\n');

  log('root:', installationRoot);
  mkdirp(installationRoot);
  let packagesInfos = getPackagesInfos(packagesToInstall);
  libFs.writeFileSync(packagesInfoPath, `module.exports = ${JSON.stringify(packagesInfos, null, 4)}`);
  installPackages(packagesInfos, installationRoot);
  log(`Installation complete!`);
};
