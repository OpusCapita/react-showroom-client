import React, { Component, PropTypes } from 'react';
import './DemoPageComponentShortInfo.less';

export default
class DemoPageComponentShortInfo extends Component {
  render() {
    return (
      <div
        className="demo-page-component-short-info"
      >
        <div className="demo-page-component-short-info__component-name">
          {this.props.componentName}
        </div>
        <div className="demo-page-component-short-info__package-info">
          <div className="demo-page-component-short-info__package-name">{this.props.packageName}</div>
          <div>@</div>
          <div className="demo-page-component-short-info__package-version">{this.props.version}</div>
        </div>
      </div>
    )
  }
}

DemoPageComponentShortInfo.propTypes = {
  packageName: PropTypes.string,
  componentName: PropTypes.string,
  version: PropTypes.string
};
