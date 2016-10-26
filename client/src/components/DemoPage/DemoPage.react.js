import React, { Component, PropTypes } from 'react';
import './DemoPage.less';
import ComponentRenderer from '../ComponentRenderer';
import FilterSidebar from '../FilterSidebar';
import DemoPageComponentShortInfo from '../DemoPageComponentShortInfo';
import Rcslider from 'rc-slider';

export default
class DemoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: !props.isScreenSmall,
      packagesInfo: [],
      componentsInfo: [],
      currentComponentId: '',
      currentComponent: null,
      options: {
        maxContainerWidth: '40%',
        isShowContainerBorders: false,
        isContentCentered: false
      }
    };
  }

  componentDidMount() {
    this.getComponentsInfo();
    this.getPackagesInfo();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.componentsInfo !== prevState.componentsInfo) {
      this.handleComponentSelection(
        this.state.componentsInfo,
        (this.state.componentsInfo[0] ? this.state.componentsInfo[0].id : 0)
      );
    }
  }

  componentWillUnmount() {
    clearTimeout(this._getComponentTimeout);
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
      this.handleComponentSelection(preparedComponentsInfo, preparedComponentsInfo[0].id);
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

  getComponent(componentInfo) {
    this.props.loader.getComponent(componentInfo, this.onComponentReady.bind(this));
  }

  onComponentReady(componentData) {
    let componentInfo = this.state.componentsInfo.filter(
      componentInfo => componentInfo.id === this.state.currentComponentId
    )[0];
    this.setState({ currentComponent: { ...componentData, componentInfo } });
  }

  toggleSidebar() {
    this.setState({
      showSidebar: !this.state.showSidebar
    })
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
  }

  render() {
    let { options, packagesInfo } = this.state;
    let isMobileScreen = window.innerWidth <= 1200;
    let currentComponentInfo = this.getCurrentComponentInfo();
    let componentRenderer = this.state.currentComponent ? (
      <ComponentRenderer
        component={this.state.currentComponent}
        componentInfo={currentComponentInfo}
        maxContainerWidth={options.maxContainerWidth}
        isScreenSmall={this.props.isScreenSmall}
        options={options}
      />
    ) : null;

    let sidebar = this.state.showSidebar || !this.props.isScreenSmall ? (
      <div
        className="demo-page__filter-sidebar"
        style={{
          zIndex: this.props.isScreenSmall ? '9999' : 1,
          boxShadow: this.props.isScreenSmall ? '0 0 12px rgba(0, 0, 0, 0.65)' : ''
        }}
      >
        <FilterSidebar
          componentsInfo={this.state.componentsInfo}
          currentComponent={this.state.currentComponent}
          onComponentChange={this.handleComponentSelection.bind(this, this.state.componentsInfo)}
          hideOnOutsideClick={this.props.isScreenSmall}
          onHide={this.toggleSidebar.bind(this)}
        />
      </div>
    ) : null;

    let toggleSidebarBtn = this.props.isScreenSmall ? (
      <button
        className="btn btn-primary demo-page__primary-btn"
        onClick={this.toggleSidebar.bind(this)}
      >
        Toggle sidebar
      </button>
    ) : null;

    let maxWidthSlider = !isMobileScreen ? (
      <div
        className="demo-page__max-container-width-slider-group"
      >
        <div className="demo-page__max-container-width-slider-group-title">
          Max width:
        </div>
        <Rcslider
          className="demo-page__max-container-width-slider"
          onChange={value => this.setOption('maxContainerWidth', `${value}%`)}
          defaultValue={parseInt(options.maxContainerWidth, 10)}
          tipFormatter={null}
        />
        <div className="demo-page__max-container-width-slider-group-value">
          {options.maxContainerWidth}
        </div>

      </div>
    ) : null;

    let componentPackage =
      packagesInfo.find(packageInfo => packageInfo.info.name === currentComponentInfo.package) || {};

    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="demo-page__main-menu-container">
            <div className="demo-page__main-menu-container-group">
              {toggleSidebarBtn}
              <div
                className="demo-page__options-group"
                onMouseEnter={() => this.setOption('isShowContainerBorders', true)}
                onMouseLeave={() => this.setOption('isShowContainerBorders', false)}
              >
                {maxWidthSlider}
                <div
                  className={`
                    demo-page__options-item-btn
                    ${options.isContentCentered ? 'demo-page__options-item-btn--active' : ' '}
                  `}
                  onClick={() => this.setOption('isContentCentered', !options.isContentCentered)}
                  style={{ paddingLeft: isMobileScreen ? '12px' : '0' }}
                >
                  Force Centering
                </div>
              </div>
            </div>
            <DemoPageComponentShortInfo
              packageName={currentComponentInfo && currentComponentInfo.package}
              packageJson={componentPackage.info}
              componentName={currentComponentInfo && currentComponentInfo.name}
              version={currentComponentInfo && currentComponentInfo.version}
              repositoryUrl={
                componentPackage.info &&
                componentPackage.info.repository &&
                componentPackage.info.repository.url
              }
              isMobileScreen={isMobileScreen}
            />
          </div>
          <hr className="demo-page__main-menu-container-bottom-hr"/>
          <div className="demo-page__component-render-container">
            {componentRenderer}
          </div>
          {sidebar}
        </div>
      </div>
    )
  }
}

DemoPage.propTypes = {
  loader: PropTypes.object.isRequired,
  isScreenSmall: PropTypes.bool
};
