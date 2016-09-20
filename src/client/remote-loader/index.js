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

function getComponent() {
  console.log('Get Component Info');
}

export default {
  getPackagesInfo,
  getComponentsInfo,
  getComponent
}

