import React, { Component, PropTypes } from 'react';
import './RepositoryInfoFilesViewer.less';
import SimpleFullScreenModal from '../SimpleFullScreenModal';
import Markdown from 'react-remarkable';
import agent from 'superagent';

class RepositoryInfoFilesViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: {},
      isShowFile: false,
      currentFile: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    clearTimeout(this._timeCompensationTimeout);
    if (nextProps.repositoryUrl && (this.props.repositoryUrl !== nextProps.repositoryUrl)) {
      this.setState({ files: {} });
      this._timeCompensationTimeout = setTimeout(() => {
        let { packageJson, repositoryUrl, files } = nextProps;
        this.initFiles(packageJson, repositoryUrl, files);
      }, 300);
    }
  }

  componentWillUnmount() {
    clearTimeout(this._timeCompensationTimeout);
  }

  initFiles(packageJson, repositoryUrl, files) {
    if (!repositoryUrl) {
      return;
    }
    Object.keys(files).map(infoName => {
      let fileNames = files[infoName];
      fileNames.find(fileName => {
        let fileUrl = this.getFileUrl(packageJson, repositoryUrl, fileName);
        this.tryGetFile(fileUrl, infoName, this.setInfoContent.bind(this));
      });
    });
  }

  setInfoContent(infoName, content) {
    let prevFiles = this.state.files;
    let nextFiles = Object.assign({}, prevFiles, { [infoName]: content });
    this.setState({ files: nextFiles });
  }

  tryGetFile(fileUrl, infoName, onContent) {
    agent.get(fileUrl).
      end((error, response) => {
        if (error || response.statusCode !== 200) {
          return;
        }
        let content = response.text;
        onContent(infoName, content);
      });
  }

  getFileUrl(packageJson, repositoryUrl, fileName) {
    if (/\/gitweb\//gi.test(repositoryUrl)) {
      let rawFileUrl = `${repositoryUrl};;a=blob_plain;f=${fileName}`;
      return rawFileUrl;
    }
    if (/\/github\//gi) {
      let githubUser = repositoryUrl.replace(/.*github\.com\/(.*)\/.*/gi, '$1');
      let githubRepository = repositoryUrl.
        replace(new RegExp(`.*${githubUser}\/(.*).*`, 'gi'), '$1').
        replace(/\.git$/gi, '');
      let rawFileUrl = `//raw.githubusercontent.com/${githubUser}/${githubRepository}/master/${fileName}`;
      return rawFileUrl;
    }
    return null;
  }

  showFile(fileName) {
    this.setState({ isShowFile: true, currentFile: fileName });
  }

  cancelShowFile() {
    this.setState({ isShowFile: false, currentFile: '' });
  }

  handleFileButtonClick(fileName) {
    this.showFile(fileName);
  }

  render() {
    let { files, isShowFile, currentFile } = this.state;
    let infoContent = currentFile ? files[currentFile] : '';
    let buttons = Object.keys(files).map((fileName, index) => (
      <button
        className="repository-info-files-viewer__file-button"
        onClick={() => { this.handleFileButtonClick.call(this, fileName) }}
        key={index}
      >
        {fileName}
      </button>
    ));
    return (
      <div className="repository-info-files-viewer">
        {buttons}
        <SimpleFullScreenModal
          isOpen={isShowFile}
          onHide={this.cancelShowFile.bind(this)}
          headerLabel={currentFile}
        >
          <div className="repository-info-files-viewer__modal-content">
            <Markdown
              source={infoContent}
              options={{
                html: true,
                linkify: true,
                breaks: true
              }}
            />
          </div>
        </SimpleFullScreenModal>
      </div>
    );
  }
}

RepositoryInfoFilesViewer.propTypes = {
  files: PropTypes.object,
  repositoryUrl: PropTypes.string
};

RepositoryInfoFilesViewer.defaultProps = {
  files: {}
}

export default RepositoryInfoFilesViewer;
