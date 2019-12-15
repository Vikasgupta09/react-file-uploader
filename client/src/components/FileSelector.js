import React from 'react';
import PropTypes from 'prop-types';

class FileSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { highlight: false, errorMessage: '' };
    this.fileInputRef = React.createRef();
  }

  openFileDialog = () => {
    this.fileInputRef.current.click();
  };

  onFilesAdded = evt => {
    const file = evt.target.files[0];
    this.handleAddFile(file);
  };

  handleAddFile = file => {
    const validationError = this.validateFile(file);
    if (validationError) {
      this.setState({
        errorMessage: validationError
      });
    } else if (this.props.onFilesAdded) {
      this.setState({
        errorMessage: ''
      });
      this.props.onFilesAdded([file]);
    }
  };

  validateFile = file => {
    // Get allowed mime type
    const types = this.props.restrictions.allowedFileTypes;
    let error = '';
    console.log(file.name)
    console.log(file.type);
    // check if file type is allowed or not
    if (
      types.every(type => {
        if (type.indexOf('*') > -1) {
          let mimeTypeAllowed = type.split('/')[0];
          let fileMimeTypePrefix = file.type.split('/')[0];
          console.log(mimeTypeAllowed, fileMimeTypePrefix);
          console.log('if -',mimeTypeAllowed === fileMimeTypePrefix);
          return mimeTypeAllowed !== fileMimeTypePrefix;
        } else {
          console.log('else -',file.type !== type);
          return file.type !== type;
        }
      })
    ) {
      error += file.type + ' is not a supported file format. ';
    }
    // check if file size is in allowed range or not
    if (file.size > this.props.restrictions.maxFileSize) {
      error += file.name + ' exceeds max allowed limit.';
    }
    console.log('returning err-',error);
    return error;
  };

  onDragOver = event => {
    event.preventDefault();
    this.setState({ hightlight: true });
  };

  onDragLeave = event => {
    this.setState({ hightlight: false });
  };

  onDrop = event => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    this.setState({ hightlight: false });
    this.handleAddFile(file);
  };

  render() {
    let allowedFileTypes = this.props.restrictions.allowedFileTypes.join();
    let maxFileSize = this.props.restrictions.maxFileSize / 1000000 + ' Mb';

    return (
      <div>
        <div
          className="ui dashboard-content secondary segment active"
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          onDrop={this.onDrop}
          onClick={this.openFileDialog}
          style={{
            cursor: 'pointer',
            height: '220px',
            marginTop: '15px',
            padding: '4.5em'
          }}
        >
          <input
            ref={this.fileInputRef}
            className="FileInput"
            type="file"
            accept={allowedFileTypes}
            onChange={this.onFilesAdded}
            style={{ display: 'none' }}
          />
          <h2>Drag 'n' drop your file here, or click to select file</h2>
        </div>
        <div>
          <div className="ui warning bottom attached message">
            <i className="warning icon"></i>
            Supported File Types: {allowedFileTypes} & Max File Size is{' '}
            {maxFileSize}
          </div>
        </div>
        {this.state.errorMessage && (
          <div className="ui error message">
            <div className="header">
              There is an error with your file submission
            </div>
            <p>{this.state.errorMessage}</p>
          </div>
        )}
      </div>
    );
  }
}

FileSelector.propTypes = {
  maxFileSize: PropTypes.number,
  allowedFileTypes: PropTypes.array
};

FileSelector.defaultProps = {
  maxFileSize: 1000000,
  allowedFileTypes: ['image/*']
};

export default FileSelector;
