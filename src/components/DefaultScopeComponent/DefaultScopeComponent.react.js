import PropTypes from 'prop-types';
import React, { Component } from 'react';
import showroomScopeDecorator from '../../decorators/showroomScopeDecorator';
const host = (window._showroom && window._showroom.env && window._showroom.env.HOST) || 'localhost';
const port = (window._showroom && window._showroom.env && window._showroom.env.PORT) || '3000';

@showroomScopeDecorator
class DefaultScopeComponent extends Component {
  render = () => (<div>{this._renderChildren()}</div>);
}

export default DefaultScopeComponent;
