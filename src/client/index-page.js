import React from 'react';
import ReactDOM from 'react-dom';
import DemoPageIndex from './components/DemoPageIndex.react';
import getComponents from './getComponents';

let rootElement = document.getElementById('main');
let demoPageIndex = React.createElement(DemoPageIndex, { getComponents });

ReactDOM.render(demoPageIndex, rootElement);
