'use strict';

let yargs = require('yargs');
let fs = require('fs');
let initApp = require('./initApp');
let addComponent = require('./addComponent');
let config = require('./config');
let version = require('../package.json').version;

function doInitApp(directory) {
  let isDirectoryEmpty = !fs.readdirSync(directory).length;
  if(!isDirectoryEmpty) {
    throw new Error(`Target directory ${directory} is not empty.`);
  }
  initApp(directory);
}

function doAddComponent(directory) {
  addComponent(directory);
}

function initCli() {
  return yargs
    .epilog(`Have questions? Contact us:
      alexey.sergeev@opuscapita.com,
      kirill.volkovich@opuscapita.com
      \n
      @opuscapita/react-showroom-template@${version}
    `)
    .usage(`\nUsage:
      init - empty OpusCapita react application will be created in working directory
      add - react component template will be created in 'components' dir
    `)
    .showHelp()
    .command(
      'init',
      `Init OpusCapita react application at ${process.cwd()}`,
      () => doInitApp(process.cwd())
    )
    .command(
      'add',
      `Template react component will be created`,
      () => doAddComponent(process.cwd()))
    .argv;
}

module.exports = function() {
  initCli();
};
