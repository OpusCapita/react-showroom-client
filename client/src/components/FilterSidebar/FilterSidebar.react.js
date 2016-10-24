import React, { Component, PropTypes } from 'react';
import './FilterSidebar.less';
import fuzzysearch from 'fuzzysearch';
import FilterSidebarComponentItem from '../FilterSidebarComponentItem';

export default
class FilterSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterInputValue: ''
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('click', this.handleClickOutside);
    this.refs.searchInput.focus();
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleClickOutside);
  }

  filterComponentsLists(componentsInfo, filterText) {
    return componentsInfo.filter(component => {
      return fuzzysearch(filterText.toLowerCase(), component.name.toLowerCase())
    })
  }

  handleFilterInputChange(e) {
    this.setState({ filterInputValue: e.target.value })
  }

  collapseBy(list, by) {
    return list.reduce((results, current) => {
      return results.some(result => result[by] === current[by]) ? results : results.concat([current]);
    }, []);
  }

  handleClickOutside(event) {
    if(!this.props.hideOnOutsideClick) {
      return false;
    }
    console.log('hoco', this.props.hideOnOutsideClick);
    event.preventDefault();
    let hasParent = (node, parent) => {
      if (node.parentNode) {
        return node.parentNode === parent || hasParent(node.parentNode, parent);
      }
      return false;
    };
    if (event.target !== this._container && !hasParent(event.target, this._container)) {
      this.props.onHide();
    }
  }

  render() {
    let preparedComponentsList = this.filterComponentsLists(this.props.componentsInfo, this.state.filterInputValue);
    preparedComponentsList = this.collapseBy(preparedComponentsList, 'name');
    preparedComponentsList = preparedComponentsList.sort(
      (component1, component2) => component1.name > component2.name ? 1 : -1
    );
    return (
      <div
        ref={container => { this._container = container }}
        className="filter-sidebar"
      >
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
  onHide: PropTypes.func,
  hideOnOutsideClick: PropTypes.bool
};
FilterSidebar.defaultProps = {
  currentComponent: {},
  componentsInfo: [],
  hideOnOutsideClick: false
};
