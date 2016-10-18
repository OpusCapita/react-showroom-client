import React, { Component, PropTypes } from 'react';
import './ComponentRendered.less';
import ComponentRendererElement from '../ComponentRendererElement';
import Documentation from '../Documentation';
import DefaultScopeComponent from '../DefaultScopeComponent';
import CodeMirror from 'react-codemirror';
import { I18nManager } from 'jcatalog-i18n';
import 'react-codemirror/node_modules/codemirror/lib/codemirror.css';
import 'react-codemirror/node_modules/codemirror/theme/material.css';
import 'react-codemirror/node_modules/codemirror/mode/jsx/jsx';
import { formatPatterns } from '../../i18n/config';
import { parseDocumentation } from '../../parseComponents';

window.React = React;

export default
class ComponentRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '{}',
      transpiledCode: '() => return null',
      reactElement: null
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
    this.setReactClassGlobally(this.props);
    this.initDefaultCode();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.component !== nextProps.component) {
      this.setReactClassGlobally(nextProps);
    }
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
    this.createReactElement(code);
  }

  updateCode(newCode) {
    if (typeof this.isCodeTypingStoppedTimeout !== 'undefined') {
      clearTimeout(this.isCodeTypingStoppedTimeout);
    }
    this.isCodeTypingStoppedTimeout = setTimeout(() => {
      this.createReactElement(newCode);
    }, 150);
    this.setState({
      code: newCode
    });
  }

  createReactElement(code) {
    let childElement;
    try {
      childElement = React.createElement(this.props.scopeComponentReactClass, { _childrenCode: code })
    } catch (err) {
      console.log('ComponentRenderer - render error:', err);
      childElement = null;
    }
    this.setState({ reactElement: childElement });
  }

  setReactClassGlobally(props) {
    let componentName = props.componentInfo.name || props.component.componentClass.name;
    window[componentName] = props.component.componentClass;
  }

  render() {
    let { component, options } = this.props;
    let containerBordersClassName = options.isShowContainerBorders ?
      'component-renderer__element-container-inner--with-borders' :
      ' ';
    let contentCenteredClassName = options.isContentCentered ?
      'component-renderer__element-container-inner--content-centered' :
      ' ';
    let componentDocumentation = component.relatedFiles.filter(
      relatedFile => relatedFile.name === 'readme'
    )[0].content;

    return (
      <div className="row component-renderer">
        <div
          className={`
            col-xs-12 component-renderer__element-container-outer
            ${containerBordersClassName}
          `}
          style={{ maxWidth: this.props.maxContainerWidth }}
        >
          <div
            className={` component-renderer__element-container-inner ${contentCenteredClassName} `}
          >
            <ComponentRendererElement
              element={this.state.reactElement}
              componentId={this.props.componentInfo.id}
            />
          </div>
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
  componentInfo: PropTypes.object,
  maxContainerWidth: PropTypes.string,
  options: PropTypes.object,
  scopeComponentReactClass: PropTypes.func
};
ComponentRenderer.defaultProps = {
  maxContainerWidth: '100%',
  scopeComponentReactClass: DefaultScopeComponent
};
ComponentRenderer.contextTypes = {
  i18n: PropTypes.object
};
ComponentRenderer.childContextTypes = {
  i18n: PropTypes.object,
  serviceRegistry: PropTypes.func
};

