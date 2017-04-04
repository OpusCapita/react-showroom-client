'use strict';

let fs = require('fs');
let path = require('path');
let globule = require('globule');

function replaceIn(file, replaceWhat, replaceBy) {
  let oldFileContent = fs.readFileSync(file, 'utf-8');
  let newFileContent = oldFileContent.replace(replaceWhat, replaceBy);
  fs.writeFileSync(file, newFileContent);
}

function findFilesByGlobs(where, globPatterns) {
  return globule.find({
    srcBase: where,
    src: globPatterns
  })
  .map(file => path.resolve(path.join(where, file)));
}

module.exports = {
  replaceIn: replaceIn,
  findFilesByGlobs: findFilesByGlobs
};
