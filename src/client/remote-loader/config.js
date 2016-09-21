let hostUrl =  'http://localhost:3888';
let packagesInfoUrl = hostUrl + '/packages-info';
let componentsInfoUrl = hostUrl + '/components-info';

export default {
  hostUrl,
  packagesInfoUrl,
  componentsInfoUrl,
  getPackageUrl: (packageName, version) =>
    `${hostUrl}/packages/${packageName}/${version}`,
  getRelatedFileUrl: (packageName, version, relativePath) =>
    `${hostUrl}/package-related-files/${packageName}/${version}/${relativePath}`
}
