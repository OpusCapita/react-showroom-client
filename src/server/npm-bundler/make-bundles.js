'use strict';

let libFs = require('fs');
let libPath = require('path');
let config = require('./config');
let execSync = require('child_process').execSync;
let log = console.log;

function makeBundle(input, output) {
  log('Bundling:\n\t', input);
  execSync(`webpack ${input} ${output}`);
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
      let packageMainFile = libPath.join(installedVersionDir, packageJSONContent.main);
      return ({
        input: packageMainFile,
        output: libPath.join(installationRoot, packageName, version, 'bundle.js'),
      })
    });
    return IODirs.concat(nextIODirs);
  }, []);
}

log('Started bundling.');
let dirs = getIODirs(config.installationRoot);
dirs.map(dir => makeBundle(dir.input, dir.output));
log('Bundling complete.');
