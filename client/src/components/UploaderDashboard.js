import React from 'react';
import FileSelector from './FileSelector';
import FileUploader from './FileUploader';
import './UploaderDashboard.css';

class UploaderDashboard extends React.Component {
  state = {
    files: []
  };

  onFilesAdded = files => {
    this.setState({
      files: files
    });
  };

  handleClear = () => {
    this.setState({
      files: []
    });
  };

  render() {
    return (
      <div className="ui dashboard-container">
        <span className="ui dashboard-title teal center aligned header">
          File Uploader
        </span>

        {this.state.files.length === 0 && (
          <FileSelector
            onFilesAdded={this.onFilesAdded}
            restrictions={this.props.config}
          />
        )}

        {this.state.files.length > 0 && (
          <FileUploader
            files={this.state.files}
            uploadProgress={0}
            uploading={false}
            successfullUploaded={false}
            onClear={this.handleClear}
          />
        )}
      </div>
    );
  }
}

export default UploaderDashboard;
