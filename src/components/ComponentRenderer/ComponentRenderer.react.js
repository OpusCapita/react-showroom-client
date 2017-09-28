import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './ComponentRendered.less';
import ComponentRendererElement from '../ComponentRendererElement';
import Documentation from '../Documentation';
import DefaultScopeComponent from '../DefaultScopeComponent';
import EmptyScopeComponent from '../EmptyScopeComponent';
import CodeMirror from 'react-codemirror';
import CompilationErrorContainer from '../CompilationErrorContainer';
import StylesEditor from '../StylesEditor';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/jsx/jsx';
import { parseDocumentation } from '../../parseComponents';
import fixIt from 'react-fix-it';

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
    let { isUseScope, component } = this.props;
    let ScopeComponentClass = isUseScope ?
        (component.scopeClass || DefaultScopeComponent) :
        EmptyScopeComponent;

    try {
      /* TO-DO It will be reimplemented in more reactive way when scope component will be removed */
      if (window._showroom) {
        window._showroom.codeCompilationError = null;
      } else {
        window._showroom = {};
      }
      childElement = React.createElement(ScopeComponentClass, { _childrenCode: code });
    } catch (err) {
      /* TO-DO It will be reimplemented in more reactive way when scope component will be removed */
      if (window._showroom) {
        window._showroom.codeCompilationError = err.message;
      } else {
        window._showroom = {};
      }
      console.log('ComponentRenderer - render error:', err);
      childElement = null;
    }
    this.setState({ reactElement: childElement });
  }

  setReactClassGlobally(props) {
    let componentName = props.componentInfo.name || props.component.componentClass.name;
    window[componentName] = fixIt(props.component.componentClass);
  }

  render() {
    let { component, options, maxContainerWidth } = this.props;
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

    let componentStyles = component.styles;

    // TODO - add stylesEditor
    let stylesEditorElement = null;
    // let stylesEditorElement = componentStyles ? (
    //   <div className="component-renderer__showroom-styles-editor">
    //     <StylesEditor initialRawStyles={componentStyles} />
    //   </div>
    // ) : null;

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
          style={{ width: isMobileScreen ? '100%' : maxContainerWidth }}
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
        {stylesEditorElement}
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
              <CompilationErrorContainer />
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
  isScreenSmall: PropTypes.bool,
  isUseScope: PropTypes.bool
};
ComponentRenderer.defaultProps = {
  maxContainerWidth: '100%',
  isUseScope: true
};
