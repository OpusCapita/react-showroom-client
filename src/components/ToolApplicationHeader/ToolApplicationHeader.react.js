import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './ToolApplicationHeader.less';
let svgLogoContent = require('!!raw-loader!./logo.svg');

export default
class ToolApplicationHeader extends Component {
  render() {
    return (
      <div className="tool-application-header">
        <div className="row">
          <div
            className="col-md-6 tool-application-header__title-container"
          >
            <a
              target="_blank"
              title="Go to Showroom repository"
              href="https://github.com/OpusCapita/react-showroom-client"
              className="tool-application-header__link"
            >
              <div
                title="OpusCapita logo"
                className="tool-application-header__company-logo"
                dangerouslySetInnerHTML={{ __html: svgLogoContent }}
              />
              <h1 className="tool-application-header__title">{this.props.applicationName}</h1>
            </a>
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
  )
};
