import React, { Component, PropTypes } from 'react';
import './Documentation.less';
import Markdown from 'react-remarkable';
import hljs from 'highlight.js';

export default
class Documentation extends Component {
  static propTypes = {
    markdown: PropTypes.string
  };

  highlightCode(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) { }
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) { }

    return '';
  }

  render() {
    let { isMobileScreen, isHorizontalLayout } = this.props;
    let documentationStyles = {};
    if (isMobileScreen) {
      documentationStyles = { paddingLeft: '6px', paddingRight: '6px' }
    }
    if (isHorizontalLayout) {
      documentationStyles = { paddingLeft: '0', paddingRight: '6px' }
    }

    return (
      <div
        className="documentation"
        style={documentationStyles}
      >
        <Markdown
          source={this.props.markdown}
          options={{
            html: true,
            linkify: true,
            breaks: true,
            highlight: this.highlightCode
          }}
        />
      </div>
    )
  }
}

Documentation.propTypes = {
  isMobileScreen: PropTypes.bool,
  isHorizontalLayout: PropTypes.bool
}
