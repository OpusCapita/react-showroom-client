/*
   What is a "scope" file. See documentation here:
   https://github.com/OpusCapitaBES/js-react-showroom-client/blob/master/docs/scope-component.md
*/

import React, { Component, PropTypes } from 'react';
import { showroomScope } from 'opuscapita-showroom-client';


@showroomScope
export default
class __jcatalog-react-app_component-name--uppercamel-case__Scope extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this._renderChildren()}
      </div>
    );
  }
}

__jcatalog-react-app_component-name--uppercamel-case__Scope.contextTypes = {
  i18n: PropTypes.object
};
__jcatalog-react-app_component-name--uppercamel-case__Scope.childContextTypes = {
  i18n: PropTypes.object
};
