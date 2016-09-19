'use strict'

let libFs = require('fs');
let libPath = require('path');
let config = require('./config');
let getModulesInfo = require('./lib').getModulesInfo;

let modulesInfo = getModulesInfo(config);
libFs.writeFileSync(libPath.join(config.tmpDirPath, 'npm-components.js'), modulesInfo);


