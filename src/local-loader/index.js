import parseDocumentation from './parseDocumentation';

function getComponentsInfo(componentns) {
  return componentns.map(component => {
    let readmeContent = component.relatedFiles.filter(relatedFile => relatedFile.name === 'readme')[0].content;
    let parsedDocumentation = parseDocumentation(readmeContent);
    let result = {
      ...component,
      'package': component.package,
      'name': parsedDocumentation.componentName,
      'version': component.version,
      tags: parsedDocumentation.tags || ''
    };
    return result
  });
}

let loaderInstance = function(loaderOptions) {
  let pkgInfo = [{ info: loaderOptions.packagesInfo[0] }];
  let cmpInfo = loaderOptions.componentsInfo;
  return {
    getPackagesInfo: onData => onData(pkgInfo),
    getComponentsInfo: onData => {
      let preparedComponentsInfo = getComponentsInfo(getComponentsInfo(cmpInfo));
      onData(preparedComponentsInfo)
    },
    getComponent: (component, onComponentReady) => {
      onComponentReady({ ...component });
    }
  }
};

export default {
  init: loaderOptions => loaderInstance(loaderOptions)
}
