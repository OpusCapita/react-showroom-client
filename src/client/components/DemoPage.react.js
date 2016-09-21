import React, { Component, PropTypes } from 'react';
import ReferenceSearchRender from './ComponentRenderer.react';
import FilterSidebar from './FilterSidebar.react';
import './DemoPage.less';

export default
class DemoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false,
      packagesInfo: [],
      componentsInfo: [],
      components: [],
      compiledComponents: [],
      currentComponentId: '',
      currentComponent: null,
    };
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    this.getComponentsInfo();
    this.getPackagesInfo();
    document.documentElement.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    document.documentElement.removeEventListener('keyup', this.handleKeyUp);
  }

  getComponentsInfo() {
    this.props.loader.getComponentsInfo(data => {
      this.setState({ componentsInfo: this.prepareComponentsInfo(data) });
    });
  }

  getComponent(component) {
    this.props.loader.getComponent(
      component,
      this.onComponentReady.bind(this)
    );
  }

  getPackagesInfo() {
    this.props.loader.getPackagesInfo(data => {
      this.setState({ packagesInfo: data });
    });
  }

  onComponentReady(componentData) {
    this.setState({ currentComponent: componentData });
  }

  prepareComponentsInfo(components) {
    let preparedComponentsInfo = components.map(component => ({
      ...component,
      id: `${component.package}/${component.version}/${component.name}`
    }));
    this.setState({
      currentComponentId: preparedComponentsInfo[0] ? preparedComponentsInfo[0].id : 0
    });
    return preparedComponentsInfo;
  }

  toggleSidebar() {
    this.setState({
      showSidebar: !this.state.showSidebar
    })
  }

  handleComponentSelection(id) {
    if(!this.state.components.filter(component => component.id === id).length) {
      let componentInfo = this.state.componentsInfo.filter(info => info.id == id)[0];
      this.getComponent(componentInfo);
    }
    this.setState({ currentComponentId: id });
  }

  handleKeyUp() {
    return;
    switch (event.which) {
      case 191: this.state.showSidebar || this.toggleSidebar(); break; // "/" KEY
      case 27: this.state.showSidebar && this.toggleSidebar(); break; // "RETURN" KEY
    }
  }

  render() {
    let component = this.state.currentComponent;
    let componentRenderer = component ? (
      <ReferenceSearchRender label={component.name} component={component} />
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
          components={this.state.componentsInfo}
          currentComponentId={this.state.currentComponentId}
          onComponentChange={this.handleComponentSelection.bind(this)}
        />
      </div>
    ) : null;

    return (
      <div className="row">
        <div className="col-xs-12">
          <div
            className="btn btn-primary"
            onClick={this.toggleSidebar.bind(this)}
            style={{background: '#e70', borderColor: '#e70', boxShadow: 'none'}}
          >
            Show Filter
          </div>
          {sidebar}
          <hr />
          {componentRenderer}
        </div>
      </div>
    )
  }
}

DemoPage.propTypes = {
  loader: PropTypes.object.isRequired
};
