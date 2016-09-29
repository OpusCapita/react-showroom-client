import { host, port } from '../../../serverConfig';
let hostUrl = `http://${host}:${port}`;
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
