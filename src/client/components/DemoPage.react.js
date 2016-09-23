import React, { Component, PropTypes } from 'react';
import ComponentRenderer from './ComponentRenderer.react';
import FilterSidebar from './FilterSidebar.react';
import DemoPageComponentShortInfo from './DemoPageComponentShortInfo.react';
import Rcslider from 'rc-slider';
import './DemoPage.less';

export default
class DemoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false,
      packagesInfo: [],
      componentsInfo: [],
      currentComponentId: '',
      currentComponent: null,
      maxContainerWidth: '100%'
    };
  }

  componentDidMount() {
    this.getComponentsInfo();
    this.getPackagesInfo();
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
      this.setState({ componentsInfo: preparedComponentsInfo });
      this.handleComponentSelection(preparedComponentsInfo[0] ? preparedComponentsInfo[0].id : 0);
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

  handleMaxContainerWidthChange(value) {
   this.setState({ maxContainerWidth: `${value}%` });
  }

  handleComponentSelection(id) {
    let componentInfo = this.state.componentsInfo.filter(info => info.id == id)[0];
    this.getComponent(componentInfo);
    this.setState({ currentComponentId: id });
  }

  render() {
    let currentComponentInfo = this.getCurrentComponentInfo();
    let componentRenderer = this.state.currentComponent ? (
      <ComponentRenderer
        component={this.state.currentComponent}
        componentInfo={currentComponentInfo}
        maxContainerWidth={this.state.maxContainerWidth}
      />
    ) : null;

    let sidebar = this.state.showSidebar ? (
      <div className="demo-page__filter-sidebar">
        <div
          onClick={this.toggleSidebar.bind(this)}
          className="demo-page__filter-sidebar-close-btn"
        >
          &times;
        </div>
        <FilterSidebar
          componentsInfo={this.state.componentsInfo}
          currentComponent={this.state.currentComponent}
          onComponentChange={this.handleComponentSelection.bind(this)}
        />
      </div>
    ) : null;

    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="demo-page__main-menu-container">
            <div className="demo-page__main-menu-container-group">
              <button
                className="btn btn-primary demo-page__primary-btn"
                onClick={this.toggleSidebar.bind(this)}
              >
                Change component
              </button>
              <div className="demo-page__max-container-width-slider-group">
                <div className="demo-page__max-container-width-slider-group-title">
                  Max width:
                </div>
                <Rcslider
                  className="demo-page__max-container-width-slider"
                  onChange={value => this.handleMaxContainerWidthChange.call(this, value)}
                  defaultValue={parseInt(this.state.maxContainerWidth, 10)}
                  tipFormatter={null}
                />
                <div className="demo-page__max-container-width-slider-group-value">
                  {this.state.maxContainerWidth}
                </div>
              </div>
            </div>
            <DemoPageComponentShortInfo
              packageName={currentComponentInfo && currentComponentInfo.package}
              componentName={currentComponentInfo && currentComponentInfo.name}
              version={currentComponentInfo && currentComponentInfo.version}
            />
          </div>
          <hr />
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
  loader: PropTypes.object.isRequired
};
