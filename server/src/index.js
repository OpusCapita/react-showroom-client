'use strict';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const app = express();
const host = require('../../client/serverConfig').host;
const port = require('../../client/serverConfig').port;

const npmLoader = require('./tools/npm-installer/loader');
const npmInstallerConfig = require('./tools/npm-installer/config');
const npmScannerConfig = require('./tools/npm-scanner/config');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static(path.normalize(__dirname + '/../lib/')));
app.use(webpackMiddleware(webpack(require('../../client/webpack.development.config.js')), {
  publicPath: '/',
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  stats: {
    colors: true
  }
}));

app.get('/', function(req, res) {
  res.sendFile(path.normalize(__dirname + '/../client/index.html'));
});

app.get('/packages-info', function(req, res) {
  console.log('Requested packages info');
  res.send(require(npmInstallerConfig.packagesInfoPath));
});

app.get('/components-info', function(req, res) {
  console.log('Requested components info');
  res.send(require(npmScannerConfig.componentsInfoPath));
});

app.get('/packages/*', function(req, res) {
  let pathParts = req.path.split('\/');
  let packageName = pathParts[2];
  let packageVersion = pathParts[3];
  console.log('Request package:', packageName, packageVersion);
  npmLoader.getPackage(
    npmInstallerConfig.installationRoot,
    packageName,
    packageVersion,
    (err, fileData) => res.send(fileData)
  );
});

app.get('/package-related-files/*', function(req, res) {
  let pathParts = req.path.split('\/');
  let packageName = pathParts[2];
  let packageVersion = pathParts[3];
  let relativePath = pathParts.slice(4, pathParts.length).join('/');
  console.log('Request related file:', packageName, packageVersion, relativePath);
  npmLoader.getRelatedFile(
    npmInstallerConfig.installationRoot,
    packageName,
    packageVersion,
    relativePath,
    (err, fileData) => res.send(fileData)
  );
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`The server is running at http://${host}:${port}/`);
});
