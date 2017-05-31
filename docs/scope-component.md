## SCOPE Component

In some situations you need a wrapper component.

### For example you want:

* Make other React component(s) available in documentation examples
* Have parent with state to show some interactive cases
* Have some *contextTypes*

### To do it you need:

Create a ComponentName.SCOPE.react.js file. SCOPE file is just a wrapper component.
It's a little tricky. But it works =)

### Examples

#### Making other React component(s) available in documentation examples

*Component.SCOPE.react.js*

```js
import React from 'react';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';
import I18nContext from '@opuscapita/react-i18n/lib/I18nContext.react';

window.I18nContext = I18nContext; // Make I18nContext a global variable

// This @showroomScopeDecorator modify React.Component prototype by adding _renderChildren() method.
export default
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
```

Now you can use ```<I18nContext />``` in your examples

*Component.DOCUMENTATION.md*

```js
<I18nContext>
  <Component />
</I18nContext>
```

#### Access to SCOPE methods and state

*Component.SCOPE.react.js*

```js
import React from 'react';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';

export default
@showroomScopeDecorator
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

Now you have access to parent SCOPE component by ```_scope``` variable.

```_scope``` has some restrictions:

**SUCCESS:**

  * ```_scope.state```
  * ```onClick={_scope.handleChildClick)}```
  * ```onClick={_scope.handleChildClick.bind(_scope))}```

**FAIL**

  * ```onClick={(event) => _scope.handleChildClick(event))}```

*Component.DOCUMENTATION.md*

```js
  <Component
    onClick={_scope.state.toggleModal.bind(_scope)}
    showModal={_scope.state.showModal}
  />
```

#### Adding some stuff to React context

*Component.SCOPE.react.js*

```js
import React from 'react';
import { I18nManager } from '@opuscapita/i18n';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';

// This @showroomScopeDecorator modify React.Component prototype by adding _renderChildren() method.
export default
@showroomScopeDecorator
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
