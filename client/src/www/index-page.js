import React from 'react';
import ReactDOM from 'react-dom';
import DemoPageIndex from './components/DemoPageIndex/DemoPageIndex.react';
import { remoteLoader } from 'jcatalog-showroom';
import '../../external_modules/jcatalog-bootstrap/dist/less/jcatalog-bootstrap-bundle.less';
import '../../external_modules/jcatalog-bootstrap/dist/less/jcatalog-bootstrap-extensions-bundle.less';

let rootElement = document.getElementById('main');
let demoPageIndex = React.createElement(DemoPageIndex, { loader: remoteLoader });

ReactDOM.render(demoPageIndex, rootElement);
