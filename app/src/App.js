import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import routes from './routes';


class App extends Component {
  render() {
    return (
      <div className="App">
          <Router>
            <Route history={routes}/>
          </Router>
      </div>
    );
  }
}

export default App;
