# Integration with Existing Package Example:

**index.html**

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.8/react-with-addons.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.8/react-dom.js"></script>
```

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
  test: /\.md$/,
  loader: 'raw-loader'
},
{
  test: /\.json$/,
  loader: 'json-loader'
}
```

#### We highly recommend to include 'autoprefixer' to your project:

PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from Can I Use. It is recommended by Google and used in Twitter, and Taobao.

```
npm install --save-dev postcss-loader autoprefixer
```

**webpack.development.config.js**

```
postcss: function () {
  return [require('autoprefixer')];
}
```

```
// modify module.loaders
{ 
  test: /\.less$/, 
  loader: 'style!css!postcss-loader!less?sourceMap'
},
{
  test: /\.css$/,
  loader: "style!css-loader!postcss-loader"
}
```

## SCOPE Component

In some situations you need a wrapper component. 

#### For example you want:

##### Use specific *contextTypes*.
##### Pass to props some value from parent state. 

**Container.react.js:**
```
// Render method return value:
<div className="container">
  <ModalContainer showModal={this.state.showModal}>
</div>
```

##### Use complex object value in property

**Container.react.js:**
```
// Top of file:
//
import UltraCell from '../cells/UltraCell.react';
//
// Render method return value:
//
<div className="container">
  <Table cellType={UltraCell}>
</div>
```

#### To do this in SHOWROOM you need:

Create a 'ComponentName'.SCOPE.react.js file. SCOPE file is just a wrapper component.

**ComponentName.SCOPE.react.js** **simple** example:

```
import React from 'react';
import { showroomScopeDecorator } from 'jcatalog-showroom';

// This @decorator add this._renderChildren() method.
@showroomScopeDecorator
class ComponentNameScope extends React.Component {
  render() {
    return (
      <div>
        {this._renderChildren()} {/* You should call this method somewhere in your JSX. */}
      </div>
    );
  }
}

export default ComponentNameScope;
```

**ComponentName.SCOPE.react.js** **complex** example:

```
import React from 'react';
import { I18nManager } from 'jcatalog-react-i18n';
import UltraCell from '../cells/UltraCell.react';
import { showroomScopeDecorator } from 'jcatalog-showroom';

// This @decorator add this._renderChildren() method.
@showroomScopeDecorator
class ComponentNameScope extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      UltraCell,
      showModal: false
    }
  }

  getChildContext() {
    return {
      i18n: new I18nManager(this.props.locale)
    };
  }
  
  toggleModal() {
    this.setState({
      showModal: !this.state.toggleModal
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleModal.bind(this)}>
          Toggle modal
        </button>
        {this._renderChildren()} {/* You should call this method somewhere in your JSX. */}
      </div>
    );
  }
}

ComponentNameScope.childContextTypes = {
  i18n: React.PropTypes.object.isRequired
};

export default ComponentNameScope;
```

#### demo.react.js

In you components config add `scopeClass` after `componentClass`

```
'componentClass': require('../components/ComponentName/ComponentName.react').default,
'scopeClass': require('../components/ComponentName/ComponentName.SCOPE.react').default
```

Now you can use contextTypes in your **Component**.
If you want access to `this` in documentation code examples, use keyword `_scope` instead of `this`.

**ComponentName.DOCUMENTATION.react.js**

#### Code examples:

```
<ComponentName showModal={_scope.state.showModal}/>
```

```
<ComponentName cellType={_scope.state.UltraCell}/>
```

We **STRONGLY** recomend to create only **one** scope file per package. In most cases it should be enough.

## Contacts:

* Alexey Sergeev - [sab@scand.com](sab@scand.com)
* Kirill Volkovich - [kirill.volkovich@jcatalog.com](kirill.volkovich@jcatalog.com)

**Enjoy! =)**
