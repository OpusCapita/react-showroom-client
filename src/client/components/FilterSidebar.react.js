import React, { Component, PropTypes } from 'react';
import fuzzysearch from 'fuzzysearch';
import './FilterSidebar.less';

export default
class FilterSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterInputValue: ''
    };
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    this.refs.searchInput.focus();
    document.documentElement.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    document.documentElement.removeEventListener('keyup', this.handleKeyUp);
  }

  getComponentsGroups(components) {
    return components.reduce((result, component) =>
      result.indexOf(component.group) === -1 ? result.concat([component.group]) : result, []);
  }

  prepareComponentsListByGroupName(components, groupName) {
    return {
      group: groupName,
      components: components.filter(component => component.group === groupName)
    }
  }

  filterComponentsLists(componentsLists, filterText) {
    return componentsLists.map(componentsList => ({
      ...componentsList,
      components: componentsList.components.filter(component =>
        fuzzysearch(filterText.toLowerCase(), component.name.toLowerCase())
      )
    }))
  }

  handleKeyUp() {
    //Dummy
  }

  handleFilterInputChange(e) {
    this.setState({ filterInputValue: e.target.value })
  }

  render() {
    let groups = this.getComponentsGroups(this.props.components);
    let componentsLists = groups.map(group =>
      this.prepareComponentsListByGroupName(this.props.components, group)
    );
    let filteredComponentsLists = this.filterComponentsLists(componentsLists, this.state.filterInputValue);

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
          {filteredComponentsLists.map((componentsList, index) => (
            <div key={index}>
              <h5>{`${componentsList.group} (${componentsList.components.length})`}</h5>
              <ul className="filter-sidebar__components-list"> {
                componentsList.components.map((component, index) =>
                  <li
                    key={index}
                    className={
                      `filter-sidebar__components-list-item ` +
                      `${component.id === this.props.currentComponent ?
                        'filter-sidebar__components-list-item--current' : ''
                      }`
                    }
                    onClick={() => this.props.onComponentChange(component.id)}
                  >
                    <div className="filter-sidebar__components-list-item-name">{component.name}</div>
                  </li>
                )
              }
              </ul>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

FilterSidebar.propTypes = {
  currentComponent: PropTypes.string,
  components: PropTypes.arrayOf(PropTypes.object).isRequired,
  onComponentChange: PropTypes.func,
  onHide: PropTypes.func
};
