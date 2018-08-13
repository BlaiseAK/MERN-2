import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';

import Base from './containers/Base';


class App extends Component {
  render() {
    return (
      <div className="App">
          <Router>
            <Base/>
          </Router>
      </div>
    );
  }
}

export default App;
