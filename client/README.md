# Integration with Existing Package Example:

**Install dependencies** 

`npm install --save-dev postcss-loader@0.13.0 raw-loader@0.5.1 jcatalog-showroom@~1.0.0 jcatalog-showroom-server@~1.0.0`

**Copy-Paste it:**

**index.html**

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.8/react-with-addons.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.8/react-dom.js"></script>
```

**server.js**

```
let componentsRoot = path.resolve(__dirname, '../../client/components');
require('jcatalog-showroom-server').makeLocalScan(componentsRoot);
```

**index-page.js**

```
import React from 'react';
import ReactDOM from 'react-dom';
import Showroom from 'jcatalog-showroom';

let element = document.getElementById('main');
let showroom = React.createElement(Showroom, {
  loaderOptions: {
    componentsInfo: require('.jcatalog-showroom/componentsInfo'),
    packagesInfo: require('.jcatalog-showroom/packageInfo')
  }
});

ReactDOM.render(showroom, element);
```

### Documentation File Example:

You can find it[**here**](http://buildserver.jcatalog.com/gitweb/?p=showroom.git;a=blob_plain;f=client/example.DOCUMENTATION.md;h=8082313ce0836e83e15a4797f7c9319929d50a2a;hb=52c392d8f7abde033690f05f9e8d442a0f65fab2)

## Dont't forget edit your webpack config:

#### Add to config these loaders: 

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

* Use specific *contextTypes*.
* Pass to props some value from parent state. 
* Use complex object value in property:

**Container.react.js:**

```
import UltraCell from '../cells/UltraCell.react';

...
render() {
  return (
    <div className="container">
      <Table cellType={UltraCell}>
    </div>
  );
}
...
```

#### To do it you need:

Create a 'Component'.SCOPE.react.js file. SCOPE file is just a wrapper component.

**Component.SCOPE.react.js** **simple** example:

```
import React from 'react';
import { showroomScopeDecorator } from 'jcatalog-showroom';

// This @decorator add this._renderChildren() method.
@showroomScopeDecorator
class ComponentNameScope extends React.Component {
  render() {
    return (
      <div>
        {this._renderChildren()} {/* You must call this method in any place of your JSX. */}
      </div>
    );
  }
}

export default ComponentNameScope;
```

**Component.SCOPE.react.js** **complex** example:

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

If you not specify SCOPE component, by default it provides jcatalog-i18n in context.

#### In documentation `_scope` variable is a ref to your SCOPE component:

**Component.DOCUMENTATION.react.js**

```
<ComponentName showModal={_scope.state.showModal}/>
```

```
<ComponentName cellType={_scope.state.UltraCell}/>
```

We **STRONGLY** recommend minimize scope files per package.

**IMPORTANT!!!**:
If you want to add your components to global **Showroom** installation, 
your DOCUMENTATION and SCOPE files must be available in package folder. SCOPE files must be transpiled to ES5.

## Contacts:

* Alexey Sergeev - [alexey.sergeev@jcatalog.com](alexey.sergeev@jcatalog.com)
* Kirill Volkovich - [kirill.volkovich@jcatalog.com](kirill.volkovich@jcatalog.com)

**Enjoy! =)**
