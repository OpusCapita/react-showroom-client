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
      options: {
        maxContainerWidth: '100%',
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
    if(this.state.componentsInfo !== prevState.componentsInfo) {
      this.handleComponentSelection(
        this.state.componentsInfo,
        (this.state.componentsInfo[0] ? this.state.componentsInfo[0].id : 0)
      );
    }
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
    let componentInfo = componentsInfo.filter(info => info.id == id)[0];
    this.getComponent(componentInfo);
    this.setState({ currentComponentId: id });
  }

  render() {
    let { options } = this.state;
    let currentComponentInfo = this.getCurrentComponentInfo();
    let componentRenderer = this.state.currentComponent ? (
      <ComponentRenderer
        component={this.state.currentComponent}
        componentInfo={currentComponentInfo}
        maxContainerWidth={options.maxContainerWidth}
        options={options}
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
          onComponentChange={this.handleComponentSelection.bind(this, this.state.componentsInfo)}
          onHide={this.toggleSidebar.bind(this)}
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
                Choose component
              </button>
              <div
                className="demo-page__options-group"
                onMouseEnter={() => this.setOption.call(this, 'isShowContainerBorders', true)}
                onMouseLeave={() => this.setOption.call(this, 'isShowContainerBorders', false)}
              >
                <div
                  className="demo-page__max-container-width-slider-group"
                >
                  <div className="demo-page__max-container-width-slider-group-title">
                    Max width:
                  </div>
                  <Rcslider
                    className="demo-page__max-container-width-slider"
                    onChange={value => this.setOption.call(this, 'maxContainerWidth', `${value}%`)}
                    defaultValue={parseInt(options.maxContainerWidth, 10)}
                    tipFormatter={null}
                  />
                  <div className="demo-page__max-container-width-slider-group-value">
                    {options.maxContainerWidth}
                  </div>

                </div>
                <div
                  className={`
                    demo-page__options-item-btn
                    ${options.isContentCentered ? 'demo-page__options-item-btn--active' : ' '}
                  `}
                  onClick={() => this.setOption.call(this, 'isContentCentered', !options.isContentCentered)}
                >
                  Force Centering
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
