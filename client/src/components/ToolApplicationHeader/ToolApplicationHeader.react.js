import React, { Component, PropTypes } from 'react';
import './ToolApplicationHeader.less';
let svgLogoContent = require('!!raw-loader!../ToolApplicationHeader/logo.svg');
let svgGitLogoContent = require('!!raw-loader!../ToolApplicationHeader/git-logo.svg');

export default
class ToolApplicationHeader extends Component {
  render() {
    return (
      <div className="tool-application-header">
        <div className="row">
          <div className="col-md-6 tool-application-header__title-container">
            <div
              title="OpusCapita logo"
              className="tool-application-header__company-logo"
              dangerouslySetInnerHTML={{ __html: svgLogoContent }}
            >
            </div>
            <h1 className="tool-application-header__title">{this.props.applicationName}</h1>
          </div>
          <div className="col-md-6" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <div className="tool-application-header__contacts">
              <strong>Contacts: </strong>
              <div className="tool-application-header__contacts-items">
                {
                  this.props.contacts.map((contact, index) => (
                    <a href={`mailto:${contact.email}`} key={index}>{contact.name}</a>
                  ))
                }
              </div>
            </div>
            <a
              title="Go to project repository"
              className="tool-application-header__git-logo"
              dangerouslySetInnerHTML={{ __html: svgGitLogoContent }}
              target="_blank"
              href={this.props.repositoryUrl}
            ></a>
          </div>
        </div>
        <hr className="tool-application-header__hr"/>
      </div>
    );
  }
}

ToolApplicationHeader.propTypes = {
  applicationName: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    })
  ),
  repositoryUrl: PropTypes.string.isRequired,
};
