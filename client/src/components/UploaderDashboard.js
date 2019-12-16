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
        <span className={"ui dashboard-title center aligned header " + (this.props.config.primaryColor)}>
          {this.props.config.uploaderHeading}
        </span>

        {this.state.files.length === 0 && (
          <FileSelector
            onFilesAdded={this.onFilesAdded}
            config={this.props.config}
          />
        )}

        {this.state.files.length > 0 && (
          <FileUploader
            files={this.state.files}
            onClear={this.handleClear}
          />
        )}
      </div>
    );
  }
}

UploaderDashboard.defaultProps = {
  config: {
    primaryColor: "teal",
    uploaderHeading: "File Uploader"
  }
}
export default UploaderDashboard;
