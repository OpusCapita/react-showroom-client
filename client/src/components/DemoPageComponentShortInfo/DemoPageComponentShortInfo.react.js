import React, { Component, PropTypes } from 'react';
import './DemoPageComponentShortInfo.less';
let svgGitLogoContent = require('!!raw-loader!./git-logo.svg');

export default
class DemoPageComponentShortInfo extends Component {
  prepareGitRepoUrl(url) {
    let isUrlIncorrect = new RegExp('.*\/git\/.*\.git$', 'gi').test(url);
    return isUrlIncorrect ?
      url.replace('/git/', '/gitweb/').replace(/gitweb\/(.*)\.git$/gi, 'gitweb/?p=$1.git;a=summary') :
      url;
  }

  render() {
    return (
      <div
        className="demo-page-component-short-info"
      >
        <div className="demo-page-component-short-info__info-container">
          <div>
            <div className="demo-page-component-short-info__component-name">
              {this.props.componentName}
            </div>
            <div className="demo-page-component-short-info__package-info">
              <div className="demo-page-component-short-info__package-name">{this.props.packageName}</div>
              <div>@</div>
              <div className="demo-page-component-short-info__package-version">{this.props.version}</div>
            </div>
          </div>
          <div>
            <a
              title="Go to project repository"
              className="demo-page-component-short-info__git-logo"
              dangerouslySetInnerHTML={{ __html: svgGitLogoContent }}
              target="_blank"
              href={this.prepareGitRepoUrl(this.props.repositoryUrl)}
            ></a>
          </div>
        </div>
      </div>
    )
  }
}

DemoPageComponentShortInfo.propTypes = {
  packageName: PropTypes.string,
  componentName: PropTypes.string,
  repositoryUrl: PropTypes.string,
  version: PropTypes.string
};
