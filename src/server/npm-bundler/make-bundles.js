'use strict';

let libFs = require('fs');
let libPath = require('path');
let execSync = require('child_process').execSync;
let log = console.log;

function makeBundle(input, output, webpackConfigPath) {
  log('Bundling:\n\t', input);
  execSync(`webpack ${input} ${output} --config ${webpackConfigPath}`);
  log('Bundle created at:\n\t', output);
}

function getIODirs(installationRoot) {
  let packages = libFs.readdirSync(installationRoot);
  return packages.reduce((IODirs, packageName) => {
    let versions = libFs.readdirSync(libPath.join(installationRoot, packageName));
    let nextIODirs = versions.map(version => {
      let installedVersionDir = libPath.join(
        installationRoot,
        packageName,
        version,
        'node_modules',
        packageName
      );
      let packageJSONFile = libPath.join(installedVersionDir, 'package.json');
      let packageJSONContent = require(packageJSONFile);
      let packageMainFile = libPath.join(installedVersionDir, packageJSONContent.main || 'index.js');
      return ({
        input: packageMainFile,
        output: libPath.join(installationRoot, packageName, version, 'bundle.js'),
      })
    });
    return IODirs.concat(nextIODirs);
  }, []);
}

module.exports = function makeBundles(config) {
  log('Started bundling.');
  let dirs = getIODirs(config.installationRoot);
  dirs.map(dir => makeBundle(dir.input, dir.output, config.webpackConfigPath));
  log('Bundling complete.');
};
