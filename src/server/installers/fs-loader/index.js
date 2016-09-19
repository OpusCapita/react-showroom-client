'use strict';

let config = require('./config');
let libFs = require('fs');
let fsUtils = require('./../fs-utils');
let addRequiresStrings = require('../fs-utils').addRequiresStrings;

let components = fsUtils.getComponentsInPaths(config.componentsPaths, config.componentFileMask, config.readmeFileMask);

if (!libFs.existsSync(config.tmpDirPath)) {
  libFs.mkdirSync(config.tmpDirPath);
}
libFs.writeFileSync(config.componentsResultsPath, addRequiresStrings(components), 'utf-8');
