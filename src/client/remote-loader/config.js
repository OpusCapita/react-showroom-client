import agent from 'superagent';

let hostUrl =  'localhost:3888';
let packagesInfoUrl = hostUrl + '/packages-info';
let versionsUrl = hostUrl + '/versions-info';

export default {
  getPackagesInfo: () => agent.get(packagesInfoUrl),
  getPackage: () => {}
}
