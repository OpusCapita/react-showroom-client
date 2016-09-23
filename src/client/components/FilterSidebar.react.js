import React, {Component, PropTypes} from 'react';
import fuzzysearch from 'fuzzysearch';
import './FilterSidebar.less';
import FilterSidebarComponentItem from './FilterSidebarComponentItem.react';

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
              <FilterSidebarComponentItem
                key={index}
                currentComponent={this.props.currentComponent}
                component={component}
                componentsInfo={this.props.componentsInfo}
                onComponentChange={this.props.onComponentChange}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

FilterSidebar.propTypes = {
  currentComponent: PropTypes.object,
  componentsInfo: PropTypes.arrayOf(PropTypes.object).isRequired,
  onComponentChange: PropTypes.func,
  onHide: PropTypes.func
};
FilterSidebar.defaultProps = {
  componentsInfo: []
};
