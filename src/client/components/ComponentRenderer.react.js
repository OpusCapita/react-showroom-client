import React, { Component, PropTypes } from 'react';
import { I18nManager } from 'jcatalog-i18n';
import ComponentRendererElement from './ComponentRendererElement.react';
import Documentation from './Documentation.react';
import CodeMirror from 'react-codemirror';
import './ComponentRendered.less';
import 'react-codemirror/node_modules/codemirror/lib/codemirror.css';
import 'react-codemirror/node_modules/codemirror/theme/material.css';
import 'react-codemirror/node_modules/codemirror/mode/jsx/jsx';
import { formatPatterns } from '../i18n/config';
import { transform } from 'babel-standalone';
import { parseDocumentation } from '../parseComponents';

window.React = React;

export default
class ComponentRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '{}',
      compiledCode: '() => return null'
    };
  }

  getChildContext() {
    if (!this.context.i18n) {
      this.context.i18n = new I18nManager('en', null, formatPatterns);
    }
    return {
      i18n: this.context.i18n,
      serviceRegistry: serviceName => ({ url: 'http://localhost:3000' })
    };
  }

  componentWillMount() {
    this.initDefaultCode();
    let parsedDocumentation = this.getParsedDocumentation();
    this.updateCompiledCode(parsedDocumentation.demoProps);
  }

  componentDidUpdate(prevProps) {
    if (this.props.component.componentClass !== prevProps.component.componentClass) {
      this.initDefaultCode();
    }
  }

  handleDefaultCodeBtnClick() {
    this.initDefaultCode(this.props.component.demoProps);
  }

  getDocumentation() {
    return this.props.component.relatedFiles.filter(
      relatedFile => relatedFile.name === 'readme'
    )[0].content;
  }

  getParsedDocumentation() {
    let parsedDocumentation = this.getDocumentation();
    return parseDocumentation(parsedDocumentation);
  }

  initDefaultCode() {
    let code = this.getParsedDocumentation().demoProps;
    this.setState({ code });
    this.updateCompiledCode(code);
  }

  updateCode(newCode) {
    if (typeof this.isCodeTypingStoppedTimeout !== 'undefined') {
      clearTimeout(this.isCodeTypingStoppedTimeout);
    }
    this.isCodeTypingStoppedTimeout = setTimeout(() => {
      this.updateCompiledCode(this.state.code);
    }, 150);
    this.setState({
      code: newCode
    });
  }

  updateCompiledCode(code) {
    let compiledCode;
    try {
      compiledCode = transform(
        `<div className="component-renderer__element-container-inner">\n${code}\n</div>`,
        { presets: ['es2015', 'react', 'stage-0'] }
      ).code;
    } catch (err) {
      console.log('ComponentRenderer - updateCompiledCode error:', err);
    }
    this.setState({ compiledCode });
  }

  render() {
    let { component, componentInfo } = this.props;
    let componentName = componentInfo.name || component.componentClass.name;
    let componentDocumentation = component.relatedFiles.filter(
      relatedFile => relatedFile.name === 'readme'
    )[0].content;
    window[componentName] = component.componentClass;
    let element;
    try {
      element = eval(this.state.compiledCode); // eslint-disable-line no-eval
    } catch (err) {
      console.log('ComponentRenderer - render error:', err);
      element = null;
    }

    console.log('element', element);
    return (
      <div className="row component-renderer">
        <div className="col-xs-12 component-renderer__element-container-outer">
          <ComponentRendererElement
            element={element}
            componentId={this.props.componentInfo.id}
          />
        </div>
        <div className="col-xs-12">
          <hr />
          <div className="row">
            <div className="col-md-6">
              <CodeMirror
                className="component-renderer__code-editor"
                value={this.state.code}
                onChange={this.updateCode.bind(this)}
                options={{
                  lineNumbers: true,
                  mode: { name: 'jsx', json: true },
                  theme: 'material',
                  tabSize: 2,
                  smartIndent: true,
                  showCursorWhenSelecting: true
                }}
              />
              <div
                className="btn btn-default component-renderer__default-code-btn"
                onClick={this.handleDefaultCodeBtnClick.bind(this)}
              >
                Reset code
              </div>
            </div>
            <div className="col-md-6">
              <Documentation markdown={componentDocumentation}/>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

ComponentRenderer.propTypes = {
  component: PropTypes.object,
  componentInfo: PropTypes.object
};
ComponentRenderer.contextTypes = {
  i18n: PropTypes.object
};
ComponentRenderer.childContextTypes = {
  i18n: PropTypes.object,
  serviceRegistry: PropTypes.func
};

