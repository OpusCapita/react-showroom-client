import React, { Component, PropTypes } from 'react';
import './Documentation.less';
import Markdown from 'react-remarkable';

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
