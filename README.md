# Integration with Existing Package Example:

**index-page.js**

```
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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

### Documentation File Example:

You can find it[**here**](http://buildserver.jcatalog.com/gitweb/?p=showroom.git;a=blob;f=example.DOCUMENTATION.md;h=45ff5ff52ab1540f9e2d7b2ebb60f6dc412bf311;hb=8f060bd0cad2c1c34c8ff10fd0de8f2b2a25cea2)

## Dont't forget edit your webpack config:

#### Add to config and install these loaders: 

**webpack.development.config.js**
```
{
  test   : /\.(png|jpg|jpeg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
  loader : 'file-loader'
},
{
  test: /\.md$/,
  loader: 'raw-loader'
},
{
  test: /\.json$/,
  loader: 'json-loader'
}
```

#### Also you should add public path where your  (express/koa/etc) http server serve static resources

**webpack.development.config.js**
```
output.publicPath: `http://localhost:3000/static/`
```

## Contacts:

* Alexey Sergeev - [sab@scand.com](sab@scand.com)
* Kirill Volkovich - [kirill.volkovich@jcatalog.com](kirill.volkovich@jcatalog.com)

**Enjoy! =)**
