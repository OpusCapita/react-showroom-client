import React, { Component, PropTypes } from 'react';
import './ComponentRendered.less';
import ComponentRendererElement from '../ComponentRendererElement';
import Documentation from '../Documentation';
import DefaultScopeComponent from '../DefaultScopeComponent';
import CodeMirror from 'react-codemirror';
import 'react-codemirror/node_modules/codemirror/lib/codemirror.css';
import 'react-codemirror/node_modules/codemirror/theme/material.css';
import 'react-codemirror/node_modules/codemirror/mode/jsx/jsx';
import { parseDocumentation } from '../../parseComponents';

window.React = React;

export default
class ComponentRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '{}',
      transpiledCode: '() => null',
      reactElement: null
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
    let ScopeComponentClass = this.props.component.scopeClass || DefaultScopeComponent;
    try {
      childElement = React.createElement(ScopeComponentClass, { _childrenCode: code })
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
    let isHorizontalLayout = (!this.props.isScreenSmall) && (parseInt(this.props.maxContainerWidth, 10) <= 50);
    let isMobileScreen = window.innerWidth <= 1200;
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
      <div
        className="row component-renderer"
        style={{
          flexDirection: isHorizontalLayout ? 'row-reverse' : 'column'
        }}
      >
        <div
          className={`
            component-renderer__element-container-outer
            ${containerBordersClassName}
          `}
          style={{ maxWidth: isMobileScreen ? '100%' : this.props.maxContainerWidth }}
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
        <div
          className="component-renderer__code-and-docs"
          style={{
            padding: isMobileScreen ? '0' : `0 ${isHorizontalLayout ? '0' : '15px'} 0 15px`
          }}
        >
          {isHorizontalLayout ? null : (<hr />)}
          <div
            style={{
              display: isHorizontalLayout ? 'block' : 'flex',
              height: isHorizontalLayout ? 'calc(100vh - 180px)' : 'auto',
              overflow: 'auto',
              flexDirection: isMobileScreen ? 'column' : 'row'
            }}
          >
            <div
              className="component-renderer__code-editor-container"
              style={{ width: (isHorizontalLayout || isMobileScreen) ? '100%' : '50%' }}
            >
              <CodeMirror
                className="component-renderer__code-editor"
                value={this.state.code}
                onChange={this.updateCode.bind(this)}
                options={{
                  lineNumbers: true,
                  mode: { name: 'jsx', json: true },
                  theme: 'material',
                  tabSize: 2,
                  lineWrapping: true,
                  smartIndent: true,
                  showCursorWhenSelecting: true
                }}
              />
              <div
                className="component-renderer__default-code-btn"
                onClick={this.handleDefaultCodeBtnClick.bind(this)}
              >
                Reset code
              </div>
            </div>
            <div
              style={{ width: (isHorizontalLayout || isMobileScreen) ? '100%' : '50%' }}
            >
              <Documentation
                markdown={componentDocumentation}
                isMobileScreen={isMobileScreen}
                isHorizontalLayout={isHorizontalLayout}
              />
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
  isScreenSmall: PropTypes.bool
};
ComponentRenderer.defaultProps = {
  maxContainerWidth: '100%'
};
