import React from 'react';
import Progress from './UploadProgress';
import { connect } from 'react-redux';
import { uploadFile, resetFileUpload } from '../actions';

class FileUploader extends React.Component {
  static defaultProps = {
    uploadProgress: 0,
    uploading: false,
    errorUploading: false,
    successfullUploaded: false
  };

  uploadFiles = () => {
    this.props.uploadFile(this.props.files[0]);
  };

  renderProgress = () => {
    if (this.props.uploading || this.props.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={this.props.uploadProgress} />
        </div>
      );
    }
  };

  renderActions = () => {
    if (this.props.successfullUploaded) {
      return (
        <div className="ui center aligned">
          <center>
            <h4 className="ui center aligned row">Your file is successfully uploaded.</h4>
          </center>
          <button
            className="ui primary button"
            onClick={() => {
              this.props.resetFileUpload();
              this.props.onClear();
            }}
          >
          Upload Again
          </button>
        </div>
      );
    } else {
      return (
        <div className="ui buttons">
          <button
            className="ui primary button"
            disabled={this.props.uploading}
            onClick={this.uploadFiles}
            style={{marginRight: '0px'}}
          >
            Upload
          </button>
          <div className="or"></div>
          <button
            className="ui button"
            disabled={this.props.uploading}
            onClick={() => {
              this.props.onClear();
            }}
            style={{marginLeft: '0px'}}
          >
            Select Another File
          </button>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="ui placeholder segment">
        {this.props.files.map(file => {
          return (
            <div className="ui icon header" key={file.name}>
              <i className="file outline icon"></i>
              {file.name}
              {this.renderProgress(file.name)}
            </div>
          );
        })}
        {this.renderActions()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    uploading: state.uploading,
    uploadProgress: state.uploadProgress,
    errorUploading: state.errorUploading,
    successfullUploaded: state.successfullUploaded
  };
};

export default connect(mapStateToProps, { uploadFile, resetFileUpload })(FileUploader);
