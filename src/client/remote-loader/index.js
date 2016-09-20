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
  let loadedReadmes = [];
  return {
    getPackagesInfo,
    getComponentsInfo,
    getPackage,
    getComponent: (componentName, onComponentReady, componentVersion, packageName) => {
      if(!isPackageLoaded(loadedPackages, packageName, componentVersion)) {
        getPackage(packageName, componentVersion, data => {
          let packageBundleContent = data;
          loadedPackages = loadedPackages.concat([{
            name: packageName,
            version: componentVersion,
            content: packageBundleContent
          }]);
          let compiledComponent = compileComponent(packageBundleContent, componentName);
          onComponentReady({ componentClass: compiledComponent });
        });
      } else {
        let packageBundleContent = loadedPackages.filter(
          loadedPackage => loadedPackage.name === packageName && loadedPackage.version === componentVersion
        )[0].content;
        let compiledComponent = compileComponent(packageBundleContent, componentName);
      }
    }
  }
}())

