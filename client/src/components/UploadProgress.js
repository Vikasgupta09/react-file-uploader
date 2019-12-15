import React from 'react';

class UploadProgress extends React.Component {
  render() {
    return (
      <div
        className={
          "ui teal progress " + 
          (this.props.progress === 100 ? " success" : " active")
        }
        data-percent={this.props.progress}
      >
        <div className="bar" style={{ width: this.props.progress + '%' }}>
          <div className="progress">{this.props.progress}%</div>
        </div>
      </div>
    );
  }
}

export default UploadProgress;
