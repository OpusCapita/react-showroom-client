import parseDocumentation from './parseDocumentation';

function getComponentsInfo(componentns) {
  return componentns.map(component => {
    let readmeContent = component.relatedFiles.filter(relatedFile => relatedFile.name === 'readme')[0].content;
    let parsedDocumentation = parseDocumentation(readmeContent);
    return {
      ...component,
      'package': component.package,
      'name': parsedDocumentation.componentName,
      'version': component.version,
      tags: parsedDocumentation.tags || ''
    };
  });
}

let loaderInstance = function(loaderOptions) {
  let pkgInfo = loaderOptions.packagesInfo;
  let cmpInfo = loaderOptions.componentsInfo;
  return {
    getPackagesInfo: onData => onData(pkgInfo),
    getComponentsInfo: onData => {
      let preparedComponentsInfo = getComponentsInfo(getComponentsInfo(cmpInfo));
      onData(preparedComponentsInfo)
    },
    getComponent: (component, onComponentReady) => {
      onComponentReady({
        componentClass: component.componentClass,
        relatedFiles: component.relatedFiles
      });
    }
  }
};

export default {
  init: loaderOptions => loaderInstance(loaderOptions)
}
