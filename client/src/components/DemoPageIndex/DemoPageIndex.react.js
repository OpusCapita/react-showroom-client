import React, { Component, PropTypes } from 'react';
import './DemoPageIndex.less';
import DemoPage from '../DemoPage';
import ToolApplicationHeader from '../ToolApplicationHeader';
import localLoader from '../../local-loader/index';

export default
class DemoPageIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScreenSmall: this.getIsScreenSmall()
    }
  }

  setIsScreenSmall() {
    this.setState({ isScreenSmall: this.getIsScreenSmall() });
  }

  getIsScreenSmall() {
    return window.innerWidth < 1200;
  }

  componentDidMount() {
    window.addEventListener('resize', this.setIsScreenSmall.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setIsScreenSmall.bind(this));
  }

  render() {
    return (
      <div className="container-fluid">
        <div
          className="row"
          style={{ marginLeft: this.state.isScreenSmall ? '-15px' : '285px' }}
        >
          <div className="col-xs-12">
            <ToolApplicationHeader
              applicationName="Showroom"
              repositoryUrl="http://buildserver.jcatalog.com/gitweb/?p=showroom.git"
              contacts={[
                { name: 'alexey.sergeev@jcatalog.com', email: 'alexey.sergeev@jcatalog.com' },
                { name: 'kirill.volkovich@jcatalog.com', email: 'kirill.volkovich@jcatalog.com' }
              ]}
            />
          </div>
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
