import React, { Component, PropTypes } from 'react';
import ReferenceSearchRender from './ComponentRenderer.react';
import FilterSidebar from './FilterSidebar.react';
import DemoPageComponentShortInfo from './DemoPageComponentShortInfo.react';
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
    this.setState({ currentComponent: componentData });
  }

  toggleSidebar() {
    this.setState({
      showSidebar: !this.state.showSidebar
    })
  }

  handleComponentSelection(id) {
    let componentInfo = this.state.componentsInfo.filter(info => info.id == id)[0];
    this.getComponent(componentInfo);
    this.setState({ currentComponentId: id });
  }

  render() {
    let currentComponentInfo = this.getCurrentComponentInfo();

    let componentRenderer = this.state.currentComponent ? (
      <ReferenceSearchRender component={this.state.currentComponent} componentInfo={currentComponentInfo} />
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
          currentComponentId={this.state.currentComponentId}
          onComponentChange={this.handleComponentSelection.bind(this)}
        />
      </div>
    ) : null;

    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="demo-page__main-menu-container">
            <button
              className="btn btn-primary"
              onClick={this.toggleSidebar.bind(this)}
              style={{background: '#e70', borderColor: '#e70', boxShadow: 'none'}}
            >
              Show Filter
            </button>
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
