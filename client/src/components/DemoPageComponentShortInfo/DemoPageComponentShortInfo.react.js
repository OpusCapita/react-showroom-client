import React, { Component, PropTypes } from 'react';
import './DemoPageComponentShortInfo.less';
import RepositoryInfoFilesViewer from '../RepositoryInfoFilesViewer';
let svgGitLogoContent = require('!!raw-loader!./git-logo.svg');

export default
class DemoPageComponentShortInfo extends Component {
  prepareGitRepoUrl(url) {
    if(!url) {
      return '';
    }
    return url.
      replace(/^git[+]/gi, '').
      replace(/^git\:\/\//gi, '//').
      replace('/git/', '/gitweb/').
      replace(/gitweb\/(.*)\.git$/gi, 'gitweb/?p=$1.git;');
  }

  render() {
    let { packageJson, isMobileScreen } = this.props;
    let repositoryUrl = this.prepareGitRepoUrl(this.props.repositoryUrl);
    let repositoryLink = repositoryUrl ? (
      <a
        title="Go to project repository"
        className="demo-page-component-short-info__git-logo"
        dangerouslySetInnerHTML={{ __html: svgGitLogoContent }}
        target="_blank"
        href={repositoryUrl}
      ></a>
    ) : null;

    return (
      <div
        className="demo-page-component-short-info"
      >
        <div
          className="demo-page-component-short-info__info-container"
          style={{
            flexDirection: isMobileScreen ? 'column-reverse' : 'row'
          }}
        >
          <div
            className="demo-page-component-short-info__package-info-files-viewer"
            style={{
              padding: isMobileScreen ? '6px 0 0 0' : '0 12px',
              marginRight: isMobileScreen ? '0' : '24px',
              justifyContent: isMobileScreen ? 'flex-end' : 'initial'
            }}
          >
            <RepositoryInfoFilesViewer
              style={{ borderRight: isMobileScreen ? 'none' : '1px solid #eee' }}
              files={{
                'Readme': ['README.MD', 'README.md', 'readme.md', 'Readme.md'],
                'Changes': ['CHANGES.txt', 'changes.txt', 'CHANGES.md', 'CHANGELOG.md', 'History.md', 'HISTORY.md']
              }}
              repositoryUrl={repositoryUrl}
            />
          </div>
          <div className="demo-page-component-short-info__package">
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
      </div>
    )
  }
}

DemoPageComponentShortInfo.propTypes = {
  packageName: PropTypes.string,
  componentName: PropTypes.string,
  repositoryUrl: PropTypes.string,
  packageJson: PropTypes.object,
  version: PropTypes.string,
  isMobileScreen: PropTypes.bool
};
