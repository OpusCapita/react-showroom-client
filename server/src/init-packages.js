'use strict';

let makeBundles = require('./tools/npm-bundler/make-bundles');
let makeScan = require('./tools/npm-scanner/make-scan').default;

let bundlerConfig = require('./tools/npm-bundler/config');
let scannerConfig = require('./tools/npm-scanner/config');

// makeInstall(installConfig);
makeBundles(bundlerConfig);
makeScan(scannerConfig);
