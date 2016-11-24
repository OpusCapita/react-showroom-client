## SCOPE Component

In some situations you need a wrapper component. 

### For example you want:

* Use specific *contextTypes*.
* Pass to props some value from parent state. 
* Use complex object value in property:

**Container.react.js:**

```js
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

### To do it you need:

Create a 'Component'.SCOPE.react.js file. SCOPE file is just a wrapper component.

**Component.SCOPE.react.js** **simple** example:

```js
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

```js
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

If you not specify SCOPE component, by default it provides **jcatalog-i18n** in context.

### In documentation `_scope` variable is a ref to your SCOPE component:

**Component.DOCUMENTATION.react.js**

```js
<ComponentName showModal={_scope.state.showModal}/>
```

```js
<ComponentName cellType={_scope.state.UltraCell}/>
```

**IMPORTANT!!!**:
If you want to add your components to global **Showroom** installation, 
your DOCUMENTATION and SCOPE files must be available in package folder. SCOPE files must be transpiled to ES5.
