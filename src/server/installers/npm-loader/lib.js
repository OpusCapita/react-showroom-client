'use strict';

let libFs = require('fs');
let libPath = require('path');
let getComponentName = require('../lib').getComponentName;

function getModulesPaths(modulesPath) {
  return libFs.readdirSync(modulesPath).map(modulePath =>
    libPath.join(modulesPath, modulePath, 'node_modules', modulePath)
  );
}

function getMainFile(modulePath, mainFilePath) {
  let mainFile;
  try {
    mainFile = libPath.resolve(libPath.join(modulePath, mainFilePath));
  } catch(err) {
    console.log('Exception getMainFile:', err);
  }
  return mainFile;
}

function getReadmeFiles(modulePath, readmePath, readmeFileMask) {
  let readmeFiles;
  try {
    readmeFiles = libFs.readdirSync(libPath.join(modulePath, readmePath))
      .filter(fileName => readmeFileMask.test(fileName))
      .map(fileName => libPath.resolve(libPath.join(modulePath, readmePath, fileName)));
  } catch(err) {
    console.log('Exception: getReadmeFiles:', err);
  }
  return readmeFiles;
}

function getModuleInfo(modulePath, mainFilePath, readmePath, readmeFileMask) {
  let mainFile = getMainFile(modulePath, mainFilePath);
  let readmePaths = getReadmeFiles(modulePath, readmePath, readmeFileMask);
  if(!readmePaths) {
    return false;
  }
  let components = readmePaths.map(readmePath => {
    let readmeContent = libFs.readFileSync(readmePath, 'utf-8');
    let componentName = getComponentName(readmeContent);
    return {
      readme: readmePath,
      mainFilePath: mainFile,
      componentName
    }
  });
  return components.map(component => addRequiresStrings(component));
};

function addRequiresStrings(component) {
  /* stringify and surround some val ues with "require($value)" */
  let componentToString =
    JSON.stringify({ readme: component.readme, componentClass: component.mainFilePath }, null, 2).
    replace(new RegExp(/\"componentClass\": ("[^"]+")/g), '"componentClass": require($1)').
    replace(new RegExp(/\"componentClass\": (.*)/g), '"componentClass": $1["' + component.componentName + '"]').
    replace(new RegExp(/\"readme\": ("[^"]+")/g), '"readme": require($1)');
  return componentToString;
}

function getModulesInfo(config) {
  let modulesPaths = getModulesPaths(config.modulesPath);
  let components = modulesPaths.map(modulePath =>
    getModuleInfo(modulePath, config.mainFilePath, config.readmePath, config.readmeFileMask)
  );
  return `module.exports = [${components}]`;
}

module.exports = {
  getModulesInfo
};
