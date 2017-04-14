import React, { Component } from 'react';
import showroomScope from '../../decorators/showroomScope';

@showroomScope
class EmptyScopeComponent extends Component {
  render = () => (<div>{this._renderChildren()}</div>);
}

export default EmptyScopeComponent;
