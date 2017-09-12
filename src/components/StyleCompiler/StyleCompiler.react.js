import React, { Component } from 'react';
import Types from 'prop-types';
import less from 'less';

const propTypes = {
  styleString: Types.string,
  onChange: Types.func,
  onError: Types.func
};
const defaultProps = {
  styleString: '',
  onError: () => {},
  onChange: () => {}
};

export default
class StyleCompiler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compiledStyle: ''
    };
  }

  componentDidMount() {
    this.compileStyle(this.props.styleString);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.styleString !== nextProps.styleString) {
      this.compileStyle(nextProps.styleString);
    }
  }

  componentWillUnmount() {
    this.removeStyleElement();
  }

  removeStyleElement() {
    if (this.styleElement) {
      let head = document.head || document.getElementsByTagName('head')[0];

      if (head.contains(this.styleElement)) {
        head.removeChild(this.styleElement);
      }
    }
  }

  updateStyleTag(compiledStyle) {
    let css = this.props.compiledStyle;
    let head = document.head || document.getElementsByTagName('head')[0];

    let styleElement = document.createElement('style');
    styleElement.type = 'text/css';

    if (styleElement.styleSheet){
      styleElement.styleSheet.cssText = compiledStyle;
    } else {
      this.removeStyleElement();
      styleElement.appendChild(document.createTextNode(compiledStyle));
    }

    this.styleElement = styleElement;
    head.appendChild(styleElement);
  }

  compileStyle(styleString, type) {
    less.render(styleString)
      .then(
        ({ css }) => {
          this.updateStyleTag(css);
          this.props.onChange(css);
        },
        (err) => {
          this.props.onError(err);
          this.removeStyleElement();
          this.updateStyleTag('');
        }
      );
  }

  render() {
    const {
      compiledStyle
    } = this.state;

    return null;
  }
}

StyleCompiler.propTypes = propTypes;
StyleCompiler.defaultProps = defaultProps;
