'use strict';

let config = require('./config');
let path = require('path');
let fs = require('fs');
let fse = require('fs-extra');
let promptUtils = require('./promptUtils');
let fsUtils = require('./fsUtils');
let findAppHomeDirectory = require('./findAppHomeDirectory');
let lodash = require('lodash');

function renameComponentFiles(directory, oldName, componentName) {
  let files = fs.readdirSync(directory);
  files.map(file => {
    let filePath = path.join(directory, file);
    let fileNewName = file.replace(oldName, componentName);
    fs.renameSync(filePath, path.join(directory, fileNewName));
  });
}

module.exports = function(directory) {
  let appHomeDirectory = findAppHomeDirectory(directory);
  let componentNameQuestion = {
    type: 'componentName',
    prompt: 'Please enter component name: ',
    validation: answer => answer,
    validationMessage: 'Component name should be not empty.',
  };

  let componentNameAnswer = promptUtils.askQuestion(componentNameQuestion);
  let componentName = lodash.startCase(componentNameAnswer.answerValue).replace(/ /g, '');
  let componentDirectory = path.join(path.resolve(appHomeDirectory, config.componentsPath), componentName);
  let isComponentAlreadyExists = fs.existsSync(componentDirectory);
  if(isComponentAlreadyExists) {
    throw new Error(`File or directory ${componentDirectory} already exists.`);
  }
  let defaultComponentTemplateName = 'BaseComponent';
  let defaultComponentTemplatePath = path.join(config.templates.components, defaultComponentTemplateName);
  fse.copySync(defaultComponentTemplatePath, componentDirectory);
  renameComponentFiles(componentDirectory, defaultComponentTemplateName, componentName);
  let filesToModify = fsUtils.findFilesByGlobs(componentDirectory, ['**/*']);

  let stringsToReplace = [
    {
      'old': /__jcatalog-react-app_component-name--uppercamel-case__/g,
      'new': componentName
    },
    {
      'old': /__jcatalog-react-app_component-name--kebab-case__/g,
      'new': lodash.kebabCase(componentName)
    }
  ];

  filesToModify.map(file => {
    if(!fs.statSync(file).isDirectory()) {
      stringsToReplace.map(replacer => {
        fsUtils.replaceIn(file, replacer.old, replacer.new);
      });
    }
  });
};
