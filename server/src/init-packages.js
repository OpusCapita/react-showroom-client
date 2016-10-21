'use strict';

let makeInstall = require('./tools/npm-installer/make-install');
let makeBundles = require('./tools/npm-bundler/make-bundles');
let makeScan = require('./tools/npm-scanner/make-scan');

let installConfig = require('./tools/npm-installer/config');
let bundlerConfig = require('./tools/npm-bundler/config');
let scannerConfig = require('./tools/npm-scanner/config');

// makeInstall(installConfig);
makeBundles(bundlerConfig);
makeScan(scannerConfig);

