## Scope Component

In some situations you need a wrapper component.

### For example you want:

* Make other React component(s) available in documentation examples
* Have parent with state to show some interactive cases
* Have some *contextTypes*

### To do it you need:

Create a ComponentName.scope.js file. "Scope" file is just a wrapper component.
It's a little tricky. But it works =)

### Examples

#### Making other React component(s) available in documentation examples

*Component.scope.js*

```js
import React from 'react';
import { showroomScope } from 'opuscapita-showroom-client';
import I18nContext from 'opuscapita-react-i18n/lib/I18nContext';

window.I18nContext = I18nContext; // Make I18nContext a global variable

// This @showroomScope decorator modify React.Component prototype by adding _renderChildren() method.
export default
@showroomScope
class ComponentNameScope extends React.Component {
  render() {
    return (
      <div>
        {this._renderChildren()} {/* You should call this method somewhere in your JSX. */}
      </div>
    );
  }
}
```

Now you can use ```<I18nContext />``` in your examples

*Component.react.md*

```js
<I18nContext>
  <Component />
</I18nContext>
```

#### Access to _scope object methods and state

*Component.env.js*

```js
import React from 'react';
import { showroomScope } from 'opuscapita-showroom-client';

export default
@showroomScope
class ComponentNameScope extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }
  
  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }
  
  render() {
    return (
      <div>
        {this._renderChildren()}
      </div>
    );
  }
}
```

Now you have access to parent scope component by ```_scope``` variable.

```_scope``` has some restrictions:

**SUCCESS:**

  * ```_scope.state```
  * ```onClick={_scope.handleChildClick)}```
  * ```onClick={_scope.handleChildClick.bind(_scope))}```
  
**FAIL**

  * ```onClick={(event) => _scope.handleChildClick(event))}```

*Component.react.md*

```js
  <Component
    onClick={_scope.state.toggleModal.bind(_scope)}
    showModal={_scope.state.showModal}
  />
```

#### Adding some stuff to React context

*Component.scope.js*

```js
import React from 'react';
import { I18nManager } from 'opuscapita-i18n';
import { showroomScope } from 'opuscapita-showroom-client';

// This @showroomScope decorator modify React.Component prototype by adding _renderChildren() method.
export default
@showroomScope
class ComponentNameScope extends React.Component {
  getChildContext() {
    return {
      i18n: new I18nManager(this.props.locale)
    };
  }
  
  render() {
    return (
      <div>
        {this._renderChildren()} {/* You should call this method somewhere in your JSX. */}
      </div>
    );
  }
}

ComponentNameScope.childContextTypes = {
  i18n: React.PropTypes.object.isRequired
};
```
