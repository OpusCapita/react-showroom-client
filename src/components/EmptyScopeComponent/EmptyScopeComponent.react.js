import React, { Component } from 'react';
import showroomScopeDecorator from '../../decorators/showroomScopeDecorator';

@showroomScopeDecorator
class EmptyScopeComponent extends Component {
  render = () => (<div>{this._renderChildren()}</div>);
}

export default EmptyScopeComponent;
