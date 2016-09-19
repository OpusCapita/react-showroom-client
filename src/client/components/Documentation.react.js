import React, { Component, PropTypes } from 'react';
import Markdown from 'react-remarkable';
import './Documentation.less';

export default
class Documentation extends Component {
  static propTypes = {
    markdown: PropTypes.string
  };

  render() {
    return (
      <div className="documentation">
        <Markdown source={this.props.markdown} />
      </div>
    )
  }
}
