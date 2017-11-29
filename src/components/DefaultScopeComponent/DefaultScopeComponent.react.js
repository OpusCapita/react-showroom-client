import React, { Component } from 'react';
import showroomScopeDecorator from '../../decorators/showroomScopeDecorator';

@showroomScopeDecorator
class DefaultScopeComponent extends Component {
  render = () => (<div>{this._renderChildren()}</div>);
}

export default DefaultScopeComponent;
