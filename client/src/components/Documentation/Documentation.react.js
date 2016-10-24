import React, { Component, PropTypes } from 'react';
import './Documentation.less';
import Markdown from 'react-remarkable';

export default
class Documentation extends Component {
  static propTypes = {
    markdown: PropTypes.string
  };

  render() {
    let { isMobileScreen } = this.props;
    let documentationStyles = isMobileScreen ? { paddingLeft: '6px', paddingRight: '6px' } : {};
    return (
      <div
        className="documentation"
        style={documentationStyles}>
        <Markdown source={this.props.markdown} />
      </div>
    )
  }
}

Documentation.propTypes = {
  isMobileScreen: PropTypes.bool
}
