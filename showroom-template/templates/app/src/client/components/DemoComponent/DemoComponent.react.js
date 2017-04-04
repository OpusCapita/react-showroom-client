/*
  This component generated automatically by 'recapita' package
  Remove it from real project
*/

import React, { Component, PropTypes } from 'react';
import './DemoComponent.less';

export default
class DemoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 0
    };
  }

  incrementClicks() {
    this.setState({ clicks: this.state.clicks + 1 });
  }

  handleButtonClick() {
    this.props.onClick();
    this.incrementClicks();
  }

  render() {
    let {
      label,
      onClick,
      className
    } = this.props;
    let { clicks } = this.state;

    return (
      <div className={`demo-component ${className}`}>
        <button
          className="demo-component__increment-button"
          onClick={this.handleButtonClick.bind(this)}
        >
          {label}
        </button>
        <hr/>
        <div>
          <span>Clicked: </span>
          <strong className="demo-component__clicks-count">{clicks}</strong>
          <span> times</span>
        </div>
      </div>
    );
  }
}

DemoComponent.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func
};
DemoComponent.defaultProps = {
  onClick: () => {},
  label: 'Give me back my label!'
};
