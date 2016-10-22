'use strict';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const app = express();
const host = require('../clientConfig').host;
const port = require('../clientConfig').port;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(webpackMiddleware(webpack(require('../webpack.development.config')), {
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
  res.sendFile(path.normalize(__dirname + '/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`The server is running at http://${host}:${port}/`);
});
