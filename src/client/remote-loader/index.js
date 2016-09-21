import agent from 'superagent';
import config from './config';

function getPackagesInfo(onData) {
  agent.get(config.packagesInfoUrl)
    .end((err, res) => {
      err && console.log('Error. Remote loader - getPackagesInfo.', err);
      onData(res.body);
    });
}

function getComponentsInfo(onData) {
  agent.get(config.componentsInfoUrl)
    .end((err, res) => {
      err && console.log('Error. Remote loader - getComponentInfo.', err);
      onData(res.body);
    });
}

function getPackage(packageName, componentVersion, onData) {
  let packageUrl = config.getPackageUrl(packageName, componentVersion);
  agent.get(packageUrl)
    .end((err, res) => {
      err && console.log('Error. Remote loader - getPackage.', err);
      onData((res.body || res.text));
    });
}

function isPackageLoaded(packages, packageName, packageVersion) {
  return packages.filter(pkg => pkg.name === packageName && pkg.version === packageVersion).length;
}

function isRelatedFileLoaded(relatedFiles, componentName, componentVersion, fileName) {
  return relatedFiles.filter(relatedFile =>
    relatedFile.componentName === componentName &&
    relatedFile.componentVersion === componentVersion &&
    relatedFile.fileName === fileName
  ).length;
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

export default (function() {
  let loadedPackages = [];
  let loadedRelatedFiles = [];
  return {
    getPackagesInfo,
    getComponentsInfo,
    getPackage,
    getComponent: (component, onComponentReady) => {
      if (!isPackageLoaded(loadedPackages, component.package, component.version)) {
        getPackage(
          component.package,
          component.version,
          data => {
            let packageBundleContent = data;
            loadedPackages = loadedPackages.concat([{
              name: component.package,
              version: component.version,
              content: packageBundleContent
            }]);
            let compiledComponent = compileComponent(packageBundleContent, component.name);
            getRelatedFiles(
              component.package,
              component.version,
              component.name,
              component.relatedFiles,
              relatedFilesContent =>
                onComponentReady({componentClass: compiledComponent, relatedFilesContent: relatedFilesContent })
            );
          });
      } else {
        let packageBundleContent = loadedPackages.filter(
          loadedPackage => loadedPackage.name === packageName && loadedPackage.version === component.version
        )[0].content;
        let compiledComponent = compileComponent(packageBundleContent, component.name);
        getRelatedFiles(
          component.package,
          component.version,
          component.name,
          component.relatedFiles,
          relatedFilesContent =>
            onComponentReady({componentClass: compiledComponent, relatedFilesContent: relatedFilesContent })
        );
      }

      // if(!isRelatedFileLoaded(loadedRelatedFiles, componentName, componentVersion, fileName)) {
      //   getPackage(packageName, componentVersion, data => {
      //     let packageBundleContent = data;
      //     loadedPackages = loadedPackages.concat([{
      //       name: packageName,
      //       version: componentVersion,
      //       content: packageBundleContent
      //     }]);
      //     let compiledComponent = compileComponent(packageBundleContent, componentName);
      //     onComponentReady({ componentClass: compiledComponent });
      //   });
      // } else {
      //   let packageBundleContent = loadedPackages.filter(
      //     loadedPackage => loadedPackage.name === packageName && loadedPackage.version === componentVersion
      //   )[0].content;
      //   let compiledComponent = compileComponent(packageBundleContent, componentName);
      // }
    }
  }
}())

