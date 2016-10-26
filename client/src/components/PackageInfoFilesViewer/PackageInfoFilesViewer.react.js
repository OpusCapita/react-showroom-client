import React, { Component, PropTypes } from 'react';
import './PackageInfoFilesViewer.less';

class PackageInfoFilesViewer extends Component {
  render() {
    let { packageInfo, fileNameKeys } = this.props;
    let buttons = fileNameKeys.map((fileNameKey, index) => {
      return (
        <button
          className="package-info-files-viewer__file-button"
          key={index}
        >
          {fileNameKey}
        </button>
      )
    });
    return (
      <div className="package-info-files-viewer">
        {buttons}
      </div>
    );
  }
}

PackageInfoFilesViewer.propTypes = {
  packageInfo: PropTypes.object,
  fileNameKeys: PropTypes.arrayOf(PropTypes.string)
};
PackageInfoFilesViewer.defaultProps = {
  packageInfo: {},
  fileNameKeys: []
}

export default PackageInfoFilesViewer;
