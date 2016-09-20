import React, { Component, PropTypes } from 'react';
import DemoPage from './DemoPage.react';
import 'jcatalog-bootstrap/dist/less/jcatalog-bootstrap-bundle.less';
import 'jcatalog-bootstrap/dist/less/jcatalog-bootstrap-extensions-bundle.less';
let logoUrl = require('../img/logo.svg');

export default
class DemoPageIndex extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <br/>
            <div className="row">
              <div className="col-md-6">
                <img style={{ width: '200px' }} src={logoUrl} alt="OpusCapita logo" />
              </div>
              <div className="col-md-6 text-right">
                <div>
                  <a
                    target="_blank"
                    href="http://buildserver.jcatalog.com/gitweb/?p=activity.git;a=summary"
                  >
                    GOTO git repository
                  </a>
                </div>
                <div>
                  <strong>Contacts: </strong>
                  <span>Kirill Volkovich</span>
                </div>
              </div>
            </div>
            <hr />
          </div>
          <div className="col-xs-12">
            <DemoPage loader={this.props.loader} />
          </div>
        </div>
      </div>
    );
  }
}

DemoPageIndex.propTypes = {
  loader: PropTypes.object.isRequired
};
