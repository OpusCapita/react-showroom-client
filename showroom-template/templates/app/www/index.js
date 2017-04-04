'use strict';

const compression = require('compression');
const express = require('express');
const fs = require('fs');
const host = require('../clientConfig').host;
const path = require('path');
const port = require('../clientConfig').port;
const webpack = require('webpack');
const compiler = webpack(require('../webpack.development.config'));

const app = express();

let componentsRoot = path.resolve(__dirname, '../src/client/components');
require('opuscapita-showroom-server').makeLocalScan(componentsRoot);

const babelrc = fs.readFileSync(path.join(__dirname, '../.babelrc'));
let config;

try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

require('babel-register')(config);

let serverOptions = {
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true}
};

app.use(compression());
app.use(require('webpack-dev-middleware')(compiler, serverOptions));

app.get('/', function(req, res) {
  res.sendFile(path.normalize(__dirname + '/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`The server is running at http://${host}:${port}/`);
});
