import React from 'react';
import ReactDOM from 'react-dom';
import DemoPageIndex from '../src/components/DemoPageIndex/DemoPageIndex.react';
import { remoteLoader } from '../src/index';
import '../external_modules/jcatalog-bootstrap/dist/less/jcatalog-bootstrap-bundle.less';
import '../external_modules/jcatalog-bootstrap/dist/less/jcatalog-bootstrap-extensions-bundle.less';

let rootElement = document.getElementById('showroom-root');
let demoPageIndex = React.createElement(DemoPageIndex, { loader: remoteLoader });

ReactDOM.render(demoPageIndex, rootElement);
