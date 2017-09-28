import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './DemoPageComponentShortInfo.less';
import RepositoryInfoFilesViewer from '../RepositoryInfoFilesViewer';
const svgGit = require('!!raw-loader!../../img/git-logo.svg');
const svgGithub = require('!!raw-loader!../../img/github-logo.svg');

export default
class DemoPageComponentShortInfo extends Component {
  prepareGitRepoUrl(url) {
    if (!url) {
      return '';
    }

    return url.
      replace(/^git[+]/gi, '').
      replace(/^git\:\/\//gi, '//').
      replace('/git/', '/gitweb/').
      replace(/gitweb\/(.*)\.git$/gi, 'gitweb/?p=$1.git;');
  }

  render() {
    let { isMobileScreen, gitHead } = this.props;
    let repositoryUrl = this.prepareGitRepoUrl(this.props.repositoryUrl);
    let repositoryLogo = /.*github.*/i.test(repositoryUrl) ? svgGithub : svgGit;
    let repositoryLink = repositoryUrl ? (
      <a
        title="Go to project repository"
        className="demo-page-component-short-info__git-logo"
        dangerouslySetInnerHTML={{ __html: repositoryLogo }}
        target="_blank"
        href={repositoryUrl}
      />
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
              justifyContent: isMobileScreen ? 'flex-end' : 'initial',
              borderRight: isMobileScreen ? 'none' : '1px solid #eee'
            }}
          >
            <RepositoryInfoFilesViewer
              style={{ borderRight: isMobileScreen ? 'none' : '1px solid #eee' }}
              files={{
                'Readme': ['README.MD', 'README.md', 'readme.md', 'Readme.md'],
                'Changes': ['CHANGES.txt', 'changes.txt', 'CHANGES.md', 'CHANGELOG.md', 'History.md', 'HISTORY.md'],
                'Contributing': ['CONTRIBUTING.md', 'CONTRIBUTING.MD']
              }}
              repositoryUrl={repositoryUrl}
              gitHead={gitHead}
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
  componentName: PropTypes.string,
  gitHead: PropTypes.string,
  isMobileScreen: PropTypes.bool,
  packageJson: PropTypes.object,
  packageName: PropTypes.string,
  repositoryUrl: PropTypes.string,
  version: PropTypes.string
};
