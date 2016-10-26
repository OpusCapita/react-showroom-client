import React, { Component, PropTypes } from 'react';
import './DemoPageComponentShortInfo.less';
let svgGitLogoContent = require('!!raw-loader!./git-logo.svg');

export default
class DemoPageComponentShortInfo extends Component {
  prepareGitRepoUrl(url) {
    return url
      .replace(/^git[+]/gi, '')
      .replace(/^git\:\/\//gi, '//')
      .replace('/git/', '/gitweb/')
      .replace(/gitweb\/(.*)\.git$/gi, 'gitweb/?p=$1.git;a=summary');
  }

  render() {
    let { repositoryUrl } = this.props;
    let repositoryLink = repositoryUrl ? (
      <a
        title="Go to project repository"
        className="demo-page-component-short-info__git-logo"
        dangerouslySetInnerHTML={{ __html: svgGitLogoContent }}
        target="_blank"
        href={this.prepareGitRepoUrl(repositoryUrl)}
      ></a>
    ) : null;

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
            {repositoryLink}
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
