'use strict';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const app = express();

const port = process.env.PORT ? process.env.PORT : 3888;
const host = process.env.HOST ? process.env.HOST : 'localhost';

const npmLoader = require('./npm-installer/loader');
const npmInstallerConfig = require('./npm-installer/config');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static(path.normalize(__dirname + '/../client/')));
app.use(webpackMiddleware(webpack(require('../../webpack.development.config.js')), {
  publicPath: '/',
  noInfo: true
}));

app.get('/', function(req, res) {
  res.sendFile(path.normalize(__dirname + '/../client/index.html'));
});

app.get('/packages-info', function(req, res) {
  res.send(require(npmInstallerConfig.infosFilePath));
});

app.get('/packages/*', function(req, res) {
  let pathParts = req.path.split('\/');
  let packageName = pathParts[2];
  let packageVersion = pathParts[3];
  let componentName = pathParts[4] || 'default';
  let responseData = npmLoader.getPackage(
    npmInstallerConfig.installationRoot, packageName, packageVersion, componentName
  );
  res.send(responseData);
});

app.listen(port, host, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`The server is running at http://${host}:${port}/`);
});
