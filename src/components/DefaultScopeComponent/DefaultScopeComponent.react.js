import React, { Component } from 'react';
import showroomScopeDecorator from '../../decorators/showroomScopeDecorator';

@showroomScopeDecorator
class DefaultScopeComponent extends Component {
  componentDidCatch = (error, info) => {
    console.log('Showroom DefaultScopeComponent:', error);
  }

  getDerivedStateFromError = (error) => {
    // Skip
  }

  render() {
    return (<div>{this._renderChildren()}</div>);
  }
}

export default DefaultScopeComponent;
