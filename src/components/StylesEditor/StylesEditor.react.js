import React, { Component } from 'react';
import Types from 'prop-types';
import StyleCompiler from '../StyleCompiler';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/css/css';

const propTypes = {
  initialRawStyles: Types.string
};
const defaultProps = {
  initialRawStyles: ''
};

export default
class StylesEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawStyles: props.initialRawStyles
    };
  }

  handleRawStylesChange = (value) => {
    this.setState({
      rawStyles: value
    });
  }

  render() {
    return (
      <div className="showroom-styles-editor">
        <CodeMirror
          value={this.state.rawStyles}
          onChange={this.handleRawStylesChange}
          options={{
            lineNumbers: true,
            mode: { name: 'text/x-less' },
            theme: 'material',
            tabSize: 2,
            lineWrapping: true,
            smartIndent: true,
            showCursorWhenSelecting: true
          }}
        />
        <StyleCompiler styleString={this.state.rawStyles} />
      </div>
    );
  }
}

StylesEditor.propTypes = propTypes;
StylesEditor.defaultProps = defaultProps;
