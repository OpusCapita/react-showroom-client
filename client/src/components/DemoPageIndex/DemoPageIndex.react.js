import React, { Component, PropTypes } from 'react';
import './DemoPageIndex.less';
import DemoPage from '../DemoPage';
import localLoader from '../../local-loader/index';

export default
class DemoPageIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScreenSmall: this.getIsScreenSmall()
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.setIsScreenSmall.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setIsScreenSmall.bind(this));
  }

  setIsScreenSmall() {
    this.setState({ isScreenSmall: this.getIsScreenSmall() });
  }

  getIsScreenSmall() {
    return window.innerWidth < 1200;
  }

  render() {
    return (
      <div className="container-fluid">
        <div
          className="row"
        >
          <div className="col-xs-12">
            <DemoPage
              loader={this.props.loader.init(this.props.loaderOptions)}
              isScreenSmall={this.state.isScreenSmall}
            />
          </div>
        </div>
      </div>
    );
  }
}

DemoPageIndex.propTypes = {
  loader: PropTypes.object.isRequired,
  loaderOptions: PropTypes.object
};

DemoPageIndex.defaultProps = {
  loader: localLoader,
  loaderOptions: {}
};
