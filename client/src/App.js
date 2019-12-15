import React, { Component } from 'react';
import Uploader from './components/UploaderDashboard';
import config from './config';

class App extends Component {
  render() {
    return (
      <div className="ui center aligned middle aligned grid">
        <Uploader config={config} />
      </div>
    );
  }
}

export default App;
