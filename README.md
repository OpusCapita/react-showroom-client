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

See **example.DOCUMENTATION.md** file at root of the package.
