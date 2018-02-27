'use strict';

let fs = require('fs');
let fse = require('fs-extra');
let path = require('path');
let config = require('./config');
let promptUtils = require('./promptUtils');
let fsUtils = require('./fsUtils');

let questions = [
   {
    type: 'projectName',
    prompt: 'Please enter project name: ',
    validation: answer => answer,
    validationMessage: 'Project name should be not empty.',
    replace: /__jcatalog-react-app_application-name__/
  },
  {
    type: 'authorName',
    prompt: 'Please enter author name: ',
    validation: answer => answer,
    validationMessage: 'Author name should be not empty.',
    replace: /__jcatalog-react-app_author-name__/
  },
  {
    type: 'authorMail',
    prompt: 'Please enter author email: ',
    validation: answer => /\S+@\S+\.\S+/.test(answer),
    validationMessage: 'Author mail should be a valid email.',
    replace: /__jcatalog-react-app_author-email__/
  }
];

/* By default, 'npm publish' command don't publish content of folders with nested package.json files.
Because it we are using package.json.tmp files, which will renamed to package.json after application init.
.gitignore file has same problem
*/
function fixTmpFiles(directory) {
  let tmpFiles = fsUtils.findFilesByGlobs(directory, ['*.tmp', '.*.tmp']);
  tmpFiles.map(filePath => {
    let newFilePath = filePath.replace(/\.tmp$/, '');
    fs.renameSync(filePath, newFilePath);
  });
}

module.exports = function(destinationDirectory) {
  let answers = promptUtils.askQuestions(questions);
  let sourceDirectory = config.templates.appBase;
  fse.copySync(sourceDirectory, destinationDirectory);

  let filesToModify = fsUtils.findFilesByGlobs(destinationDirectory, ['**/*']);

  filesToModify.map(file => {
    if(!fs.statSync(file).isDirectory()) {
      answers.map(answer => {
        fsUtils.replaceIn(file, answer.replace, answer.answerValue);
      });
    }
  });

  fixTmpFiles(destinationDirectory);
  console.log('Showroom template successfully created. \n\t Please run `yarn install`, then `yarn start`');
};
