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

  render() {
    let filteredComponentsLists = this.filterComponentsLists(this.props.components, this.state.filterInputValue);

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
            {filteredComponentsLists.map((component, index) => (
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
