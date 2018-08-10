import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button><Link to={'/'}>Homepage</Link></button>
        {/* {Auth.isUserAuthenticated() ? (
          <div>
          <button><Link to={'/logout'}>Log out</Link></button>
          </div> */}
        {/* // ):( */}
          <div>
        <button><Link to={'/signup'}>Sign up</Link></button>
        <button><Link to={'/login'}>Login</Link></button>
          </div>
        {/* // )} */}
        <div>
          <Route exact path="/"/>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage} />
        </div>
      </div>
    );
  }
}

export default App;
