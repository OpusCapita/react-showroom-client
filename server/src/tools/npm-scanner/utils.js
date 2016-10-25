'use strict';

let libFs = require('fs');
let libPath = require('path');
let markdownToAst = require('markdown-to-ast');

function findFiles(filePath, fileMask, filesIgnore) {
  return libFs.readdirSync(filePath).reduce((result, file) => {
    // TODO - write filesIgnore
    let resolvedFilePath = libPath.resolve(filePath, file);
    if (libFs.statSync(resolvedFilePath).isDirectory()) {
      return result.concat(
        findFiles(resolvedFilePath, fileMask)
      );
    }
    if (fileMask.test(resolvedFilePath)) {
      return result.concat([resolvedFilePath]);
    }
    return result;
  }, []);
}

function getComponentName(readmeContent) {
  let ast = markdownToAst.parse(readmeContent);
  let componentNameHeaderIndex = ast.children.reduce((result, branch, index) => {
    if (result === null && branch.type === 'Header' && branch.children[0].value === 'Component Name') {
      return index;
    }
    return result;
  }, null);
  return ast.children[componentNameHeaderIndex + 1].children[0].value;
}

function getComponentPath(dir, readmePath, componentMask) {
  let readmeContent = libFs.readFileSync(readmePath, 'utf-8');
  let componentName = getComponentName(readmeContent);
  return findFiles(dir, componentMask).filter(path =>
    libPath.parse(path).base.indexOf(componentName) !== -1
  )[0];
}

function getComponentsInPath(path, componentMask, readmeMask) {
  return findFiles(path, readmeMask).map(readmePath => {
    let dir = libPath.parse(readmePath).dir;
    let componentPath = getComponentPath(dir, readmePath, componentMask);
    return { componentClass: componentPath, readme: readmePath };
  });
}

function getComponentsInPaths(paths, componentMask, readmeMask) {
  return paths.reduce((result, componentsPath) => {
    let componentsInPath = getComponentsInPath(componentsPath, componentMask, readmeMask);
    return result.concat(componentsInPath);
  }, []);
}

function addRequiresStrings(components) {
  /* stringify and surround some values with "require($value)" */
  let componentsToString = JSON.stringify(components, null, 2).
  replace(new RegExp(/\"componentClass\": ("[^"]+")/g), '"componentClass": require($1).default').
  replace(new RegExp(/\"scopeClass\": ("[^"]+")/g), '"scopeClass": require($1).default').
  replace(new RegExp(/\"content\": ("[^"]+")/g), '"content": require($1)');
  let componentsResults = `module.exports = ${componentsToString}`;
  return componentsResults;
}

module.exports.findFiles = findFiles;
module.exports.getComponentsInPath = getComponentsInPath;
module.exports.getComponentsInPaths = getComponentsInPaths;
module.exports.addRequiresStrings = addRequiresStrings;
module.exports.getComponentName = getComponentName;
module.exports.addRequiresStrings = addRequiresStrings;
