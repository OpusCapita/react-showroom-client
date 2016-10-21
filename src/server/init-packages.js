'use strict';

let makeInstall = require('./npm-installer/make-install');
let makeBundles = require('./npm-bundler/make-bundles');
let makeScan = require('./npm-scanner/make-scan');

let installConfig = require('./npm-installer/config');
let bundlerConfig = require('./npm-bundler/config');
let scannerConfig = require('./npm-scanner/config');

makeInstall(installConfig);
makeBundles(bundlerConfig);
makeScan(scannerConfig);

