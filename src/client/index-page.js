import React from 'react';
import ReactDOM from 'react-dom';
import DemoPageIndex from './components/DemoPageIndex.react';
import remoteLoader from './remote-loader/index';

let rootElement = document.getElementById('main');
let demoPageIndex = React.createElement(DemoPageIndex, { loader: remoteLoader });

ReactDOM.render(demoPageIndex, rootElement);
