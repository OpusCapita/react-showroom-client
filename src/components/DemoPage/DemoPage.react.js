import React, { Component } from 'react';
import './DemoPage.less';
import ComponentRenderer from '../ComponentRenderer';
import FilterSidebar from '../FilterSidebar';
import DemoPageComponentShortInfo from '../DemoPageComponentShortInfo';
import Rcslider from 'rc-slider';
import ToolApplicationHeader from '../ToolApplicationHeader';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { spring, Motion } from 'react-motion';
import find from 'lodash/find';

export default
class DemoPage extends Component {
  constructor(props) {
    super(props);
    let query = queryString.parse(location.search);
    this.state = {
      showSidebar: (query.showSidebar === 'true') && !props.isScreenSmall,
      packagesInfo: [],
      componentsInfo: [],
      currentComponentId: '',
      currentComponent: null,
      options: {
        maxContainerWidth: (query.maxContainerWidth) || '40%',
        isShowContainerBorders: false,
        isContentCentered: query.forceCentering === 'true',
        isUseScope: typeof query.isUseScope === 'undefined' ? true : query.isUseScope
      }
    };
    this.handleHistoryPopState = this.handleHistoryPopState.bind(this);
  }

  componentWillMount() {
    this.getComponentsInfo();
    this.getPackagesInfo();
    window.addEventListener('popstate', this.handleHistoryPopState);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.componentsInfo !== prevState.componentsInfo) {
      this.initCurrentComponentId();
    }
  }

  componentWillUnmount() {
    clearTimeout(this._getComponentTimeout);
    window.removeEventListener('popstate', this.handleHistoryPopState);
  }

  initCurrentComponentId() {
    let idFromQueryString = queryString.parse(location.search).currentComponentId;
    let id = idFromQueryString ?
      idFromQueryString :
      (this.state.componentsInfo[0] && this.state.componentsInfo[0].id);
    this.handleComponentSelection(this.state.componentsInfo, id || 0);
  }

  handleHistoryPopState(event) {
    this.initCurrentComponentId();
  }

  parseQueryParameters() {
    return queryString.parse(location.search);
  }

  getPackagesInfo() {
    this.props.loader.getPackagesInfo(data => {
      this.setState({ packagesInfo: data });
    });
  }

  getCurrentComponentInfo() {
    return this.state.componentsInfo.filter(componentInfo =>
      componentInfo.id === this.state.currentComponentId
    )[0]
  }

  getComponentsInfo() {
    this.props.loader.getComponentsInfo(data => {
      let preparedComponentsInfo = this.prepareComponentsInfo(data);
      let idFromQueryString = queryString.parse(location.search).currentComponentId;
      let id = idFromQueryString || preparedComponentsInfo[0].id;
      this.handleComponentSelection(preparedComponentsInfo, id);
      this.setState({ componentsInfo: preparedComponentsInfo });
    });
  }

  prepareComponentsInfo(components) {
    let preparedComponentsInfo = components.map(component => ({
      ...component,
      id: `${component.package}/${component.version}/${component.name}`
    }));
    return preparedComponentsInfo;
  }

  setQueryStringParam(name, value) {
    let prevQueryString = this.parseQueryParameters();
    let nextQueryString = queryString.stringify({ ...prevQueryString, [name]: value });
    history.pushState({}, '', `${location.origin}${location.pathname || ''}?${nextQueryString}`);
  }

  getComponent(componentInfo) {
    this.props.loader.getComponent(componentInfo, this.onComponentReady.bind(this));
  }

  onComponentReady(componentData) {
    let componentInfo = this.state.componentsInfo.filter(
      componentInfo => componentInfo.id === this.state.currentComponentId
    )[0];
    this.setState({ currentComponent: { ...componentData, componentInfo } });
  }

  handleToggleSidebar(show) {
    this.setQueryStringParam('showSidebar', !this.state.showSidebar);
    this.setState({ showSidebar: typeof show !== 'undefined' ? show : !this.state.showSidebar });
  }

  handleToggleForceCentering() {
    let { options } = this.state;
    this.setOption('isContentCentered', !options.isContentCentered);
    this.setQueryStringParam('forceCentering', !options.isContentCentered);
  }

  handleToggleUseScope() {
    let { options } = this.state;
    this.setOption('isUseScope', !options.isUseScope);
    this.setQueryStringParam('isUseScope', !options.isUseScope);
  }

  setOption(name, value) {
    this.setState({
      options: {
        ...this.state.options,
        [name]: value
      }
    });
  }

  handleComponentSelection(componentsInfo, id) {
    let componentInfo = componentsInfo.filter(info => info.id === id)[0];
    this.setState({ currentComponentId: id });
    /* this._getComponentTimeout: ugly hack to resolve problems with component selection with synchronous loaders.
    *   if you fix it in normal way, don't forget to remove timeout clear within componentWillUnmount.
    *   Not 0 because IE */
    this._getComponentTimeout = setTimeout(() => this.getComponent(componentInfo), 16);
    this.setQueryStringParam('currentComponentId', id);
  }

  handleContainerWidthChange(value) {
    let nextMaxContainerWidth = `${value}%`;
    this.setOption('maxContainerWidth', nextMaxContainerWidth);
    this.setQueryStringParam('maxContainerWidth', nextMaxContainerWidth);
  }

  render() {
    let { isScreenSmall } = this.props;
    let { options, packagesInfo } = this.state;
    let isMobileScreen = window.innerWidth <= 1200;
    let currentComponentInfo = this.getCurrentComponentInfo();
    let componentRenderer = this.state.currentComponent ? (
      <ComponentRenderer
        component={this.state.currentComponent}
        componentInfo={currentComponentInfo}
        maxContainerWidth={options.maxContainerWidth}
        isScreenSmall={this.props.isScreenSmall}
        isUseScope={options.isUseScope}
        options={options}
      />
    ) : null;

    let sidebar = (
      <Motion
        defaultStyle={{ x: this.state.showSidebar ? 0 : 100 }}
        style={{ x: this.state.showSidebar ? (isMobileScreen ? spring(0) : 0) : (isMobileScreen ? spring(100) : 100) }}
      >
        {interpolatedStyle =>
          <div
            className={`demo-page__filter-sidebar ${isMobileScreen ? 'demo-page__filter-sidebar--mobile' : ' '}`}
            style={{
              boxShadow: this.props.isScreenSmall ? '0 0 12px rgba(0, 0, 0, 0.65)' : '',
              transform: `translate(-${interpolatedStyle.x}%, 0)`
            }}
          >
            <FilterSidebar
              componentsInfo={this.state.componentsInfo}
              currentComponent={this.state.currentComponent}
              onComponentChange={this.handleComponentSelection.bind(this, this.state.componentsInfo)}
              hideOnOutsideClick={this.props.isScreenSmall}
              onHide={() => this.handleToggleSidebar.call(this, false)}
            />
          </div>
        }
      </Motion>
    );

    let toggleSidebarBtn = (
      <button
        className="demo-page__primary-btn"
        onClick={() => this.handleToggleSidebar.call(this)}
        type="button"
      >
        SIDEBAR
      </button>
    );

    let maxWidthSlider = !isMobileScreen ? (
      <div
        className="demo-page__max-container-width-slider-group"
      >
        <div className="demo-page__max-container-width-slider-group-title">
          Max width:
        </div>
        <Rcslider
          className="demo-page__max-container-width-slider"
          onChange={this.handleContainerWidthChange.bind(this)}
          defaultValue={parseInt(options.maxContainerWidth, 10)}
          tipFormatter={null}
        />
        <div className="demo-page__max-container-width-slider-group-value">
          {options.maxContainerWidth}
        </div>

      </div>
    ) : null;

    let componentPackage = find(
      packagesInfo,
      packageInfo => packageInfo.info.name === currentComponentInfo.package
    ) || {};

    let forceCenteringToggler = (
      <div
        className={`
          demo-page__options-item-btn
          ${options.isContentCentered ? 'demo-page__options-item-btn--active' : ' '}
        `}
        onClick={this.handleToggleForceCentering.bind(this)}
        style={{ paddingLeft: isMobileScreen ? '12px' : '0' }}
      >
        Force Centering
      </div>
    );

    let useScopeToggler = (
      <div
        className={`
          demo-page__options-item-btn
          ${options.isUseScope ? 'demo-page__options-item-btn--active' : ' '}
        `}
        onClick={this.handleToggleUseScope.bind(this)}
        style={{ paddingLeft: isMobileScreen ? '12px' : '0' }}
      >
        Use scope
      </div>
    );

    let repositoryUrl = null;
    if (componentPackage.info && componentPackage.info.repository) {
      if (componentPackage.info.repository.url) {
        repositoryUrl = componentPackage.info.repository.url;
      } else if (componentPackage.info.repository) {
        repositoryUrl = 'https://github.com/' + componentPackage.info.repository;
      }
    }

    return (
      <div
        className="row demo-page"
        style={{ marginLeft: this.state.showSidebar && !isScreenSmall ? 285 : -15 }}
      >
        {sidebar}
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-12">
              <ToolApplicationHeader
                applicationName="Showroom"
                repositoryUrl="https://github.com/OpusCapita/react-showroom-client"
                contacts={[
                  { name: 'alexey.sergeev@jcatalog.com', email: 'alexey.sergeev@jcatalog.com' },
                  { name: 'kirill.volkovich@jcatalog.com', email: 'kirill.volkovich@jcatalog.com' }
                ]}
              />
            </div>
          </div>
          <div className="demo-page__main-menu-container">
            <div className="demo-page__main-menu-container-group">
              <div className="demo-page__main-menu-sidebar-button">
                {toggleSidebarBtn}
              </div>
              <div
                className="demo-page__options-group"
                onMouseEnter={() => this.setOption('isShowContainerBorders', true)}
                onMouseLeave={() => this.setOption('isShowContainerBorders', false)}
              >
                {maxWidthSlider}
                {forceCenteringToggler}
                {useScopeToggler}
              </div>
            </div>
            <DemoPageComponentShortInfo
              packageName={currentComponentInfo && currentComponentInfo.package}
              packageJson={componentPackage.info}
              componentName={currentComponentInfo && currentComponentInfo.name}
              version={currentComponentInfo && currentComponentInfo.version}
              repositoryUrl={repositoryUrl}
              gitHead={componentPackage.info && componentPackage.info.gitHead}
              isMobileScreen={isMobileScreen}
            />
          </div>
          <hr className="demo-page__main-menu-container-bottom-hr"/>
          <div className="demo-page__component-render-container">
            {componentRenderer}
          </div>
        </div>
      </div>
    )
  }
}

DemoPage.propTypes = {
  loader: PropTypes.object.isRequired,
  isScreenSmall: PropTypes.bool
};
