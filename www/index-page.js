import React from 'react';
import ReactDOM from 'react-dom';
import DemoPageIndex from '../src/components/DemoPageIndex/DemoPageIndex.react';
import { remoteLoader } from '../src/index';


let rootElement = document.getElementById('showroom-root');
let demoPageIndex = React.createElement(DemoPageIndex, { loader: remoteLoader });

ReactDOM.render(demoPageIndex, rootElement);
