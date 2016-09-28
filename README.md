### Integration with Existing Package Example:


```
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import lodash from 'lodash';
import { I18nManager } from 'jcatalog-i18n';
import Showroom from 'jcatalog-showroom';

let packageInfo = require('../../../package.json');

let componentsInfo = [
  {
    'relatedFiles': [{
      'name': 'readme',
      'content': require('../components/CatalogUserInput/CatalogUserInput.DOCUMENTATION.md')
    }],
    'componentClass': require('../components/CatalogUserInput/CatalogUserInput.react').default
  },
  {
    'relatedFiles': [{
      'name': 'readme',
      'content': require('../components/ClassificationGroupInput/ClassificationGroupInput.DOCUMENTATION.md')
    }],
    'componentClass': require('../components/ClassificationGroupInput/ClassificationGroupInput.react').default
  }
].map(component => ({
  ...component,
  'package': packageInfo.name,
  'version': packageInfo.version
}));

let element = document.getElementById('main');
let showroom = React.createElement(Showroom, { loaderOptions: { componentsInfo: componentsInfo } });

ReactDOM.render(showroom, element);
```

### Documentation File Example

See[**here**](http://buildserver.jcatalog.com/gitweb/?p=showroom.git;a=blob;f=example.DOCUMENTATION.md;h=45ff5ff52ab1540f9e2d7b2ebb60f6dc412bf311;hb=8f060bd0cad2c1c34c8ff10fd0de8f2b2a25cea2)
