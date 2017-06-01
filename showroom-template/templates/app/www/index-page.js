import React from 'react';
import ReactDOM from 'react-dom';
import Showroom from '@opuscapita/react-showroom-client';
import '../external_modules/jcatalog-bootstrap/dist/less/jcatalog-bootstrap-bundle.less';
import '../external_modules/jcatalog-bootstrap/dist/less/jcatalog-bootstrap-extensions-bundle.less';
import env from '../.env';

window._showroom = { ...(window._showroom || {}), env };

let element = document.getElementById('main');
let showroom = React.createElement(Showroom, {
  loaderOptions: {
    componentsInfo: require('.opuscapita-showroom/componentsInfo'),
    packagesInfo: require('.opuscapita-showroom/packageInfo')
  }
});

ReactDOM.render(showroom, element);
