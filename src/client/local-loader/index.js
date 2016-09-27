import agent from 'superagent';
import config from './config';
let packageInfo = require('../../../package.json');

function getPackage(packageName, componentVersion, onData) {
  let packageUrl = config.getPackageUrl(packageName, componentVersion);
  agent.get(packageUrl)
    .end((err, res) => {
      err && console.log('Error. Remote loader - getPackage.', err);
      onData((res.body || res.text));
    });
}

function getRelatedFile(packageName, packageVersion, relativePath, onData) {
  let relateFileUrl = config.getRelatedFileUrl(packageName, packageVersion, relativePath);
  agent.get(relateFileUrl)
    .end((err, res) => {
      err && console.log('Error. Remote loader - getRelatedFile.', err);
      onData((res.body || res.text));
    });
}

function getRelatedFiles(packageName, packageVersion, componentName, relatedFiles, onReady) {
  let loadedFiles = [];
  relatedFiles.map(relatedFile => {
    getRelatedFile(
      packageName,
      packageVersion,
      relatedFile.path,
      content => {
        loadedFiles = loadedFiles.concat([{
          name: relatedFile.name,
          content,
          componentName,
          componentVersion: packageVersion
        }]);
        relatedFiles.length === loadedFiles.length && onReady(loadedFiles);
      }
    );
  });
}

function compileComponent(packageBundleContent, componentName) {
  let compiledPackage;
  try {
    compiledPackage = eval(packageBundleContent);
  } catch(err) {
    console.log('Remote loader component compilation error:', err);
  }
  if(!compiledPackage) {
    return 1;
  }
  return compiledPackage[componentName] || compiledPackage.default || compiledPackage;
}
//
// (function(packagesInfo, componentsInfo) {
//   let pkgInfo = packagesInfo;
//   let cmpInfo = componentsInfo;
//   return {
//     getPackagesInfo: onData => onData(pkgInfo),
//     getComponentsInfo: onData => onData(cmpInfo),
//     getPackage,
//     getComponent: (component, onComponentReady) =>
//       onComponentReady({componentClass: compiledComponent, relatedFiles: relatedFilesContent })
//   }
// }())

export default {}
