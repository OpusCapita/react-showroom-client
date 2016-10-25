import React, { Component, PropTypes } from 'react';
import './Documentation.less';
import Markdown from 'react-remarkable';

export default
class Documentation extends Component {
  static propTypes = {
    markdown: PropTypes.string
  };

  render() {
    let { isMobileScreen, isHorizontalLayout } = this.props;
    let documentationStyles = {};
    if(isMobileScreen) {
      documentationStyles = { paddingLeft: '6px', paddingRight: '6px' }
    }
    if(isHorizontalLayout) {
      documentationStyles = { paddingLeft: '0', paddingRight: '6px' }
    }

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
  isMobileScreen: PropTypes.bool,
  isHorizontalLayout: PropTypes.bool
}
