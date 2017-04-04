'use strict';

let fs = require('fs');
let path = require('path');

let walkUpAndFind = (directory, fileName) => {
  let files = fs.readdirSync(directory);
  let isTargetInDirectory = files.find(file => file === fileName);
  if(typeof isTargetInDirectory !== 'undefined') {
    return directory;
  }
  let upperDirectory = path.resolve(directory, '..');
  return walkUpAndFind(upperDirectory, fileName);
};

module.exports = function (startDirectory) {
  let homeDirectory = walkUpAndFind(startDirectory, 'package.json');
  if(homeDirectory) {
    return homeDirectory;
  }
  throw new Error('Cant find app home directory');
};
