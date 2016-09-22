import React, {Component, PropTypes} from 'react';
import fuzzysearch from 'fuzzysearch';
import './FilterSidebar.less';

export default
class FilterSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterInputValue: ''
    };
  }

  componentDidMount() {
    this.refs.searchInput.focus();
  }

  filterComponentsLists(componentsInfo, filterText) {
    return componentsInfo.filter(component => {
      return fuzzysearch(filterText.toLowerCase(), component.name.toLowerCase())
    })
  }

  handleFilterInputChange(e) {
    this.setState({filterInputValue: e.target.value})
  }

  collapseBy(list, by) {
    return list.reduce((results, current) => {
      return results.some(result => result[by] === current[by]) ? results : results.concat([current]);
    }, []);
  }

  getComponentVersions(componentPackage, componentName, componentsInfo) {
    return componentsInfo.reduce((results, current) => {
      return (current.package === componentPackage && current.name === componentName) ?
        results.concat([current.version]) :
        results
    }, []);
  }

  handleVersionChange(component, version, componentsInfo) {
    let componentId = componentsInfo.filter(componentInfo =>
      componentInfo.package === component.package &&
      componentInfo.name === component.name &&
      componentInfo.version === version
    )[0].id;
    this.props.onComponentChange(componentId);
  }

  render() {
    let preparedComponentsList = this.filterComponentsLists(this.props.componentsInfo, this.state.filterInputValue);
        preparedComponentsList = this.collapseBy(preparedComponentsList, 'name');
    return (
      <div className="filter-sidebar">
        <div className="filter-sidebar__filter-input-wrapper">
          <input
            className="filter-sidebar__filter-input form-control"
            type="text"
            ref="searchInput"
            placeholder="Component name"
            onChange={(e) => this.handleFilterInputChange(e)}
          />
        </div>
        <div className="filter-sidebar__components-list-wrapper">
          <ul className="filter-sidebar__components-list">
            {preparedComponentsList.map((component, index) => (
              <li
                key={index}
                className={
                  `filter-sidebar__components-list-item ` +
                  `${component.id === this.props.currentComponentId ?
                    'filter-sidebar__components-list-item--current' : ''
                    }`
                }
                onClick={() => this.props.onComponentChange(component.id)}
              >
                <div className="filter-sidebar__components-list-item-name">{component.name}</div>
                <div
                  className="filter-sidebar__components-list-item-version"
                  onClick={event => event.stopPropagation()}
                >
                  <select
                    className="filter-sidebar__components-list-item-version-select"
                    onChange={(event) => this.handleVersionChange(component, event.target.value, this.props.componentsInfo)}
                  >
                    {this.getComponentVersions(
                        component.package, component.name, this.props.componentsInfo
                      ).map((version, index) =>
                        <option
                          key={index}
                          value={version}
                        >
                          {version}
                        </option>
                      )
                    }
                  </select>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

FilterSidebar.propTypes = {
  currentComponentId: PropTypes.string,
  componentsInfo: PropTypes.arrayOf(PropTypes.object).isRequired,
  onComponentChange: PropTypes.func,
  onHide: PropTypes.func
};
FilterSidebar.defaultProps = {
  componentsInfo: []
};
