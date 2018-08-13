import React from 'react';
import {PropTypes} from 'prop-types';
import {Link, Route, Switch} from 'react-router-dom';
import Auth from '../modules/Auth';
import HomePage from './HomePage';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';

const Base = () => (
    <div>
        <div className="top-bar">
            <div className="top-bar-left">
                <Link to={"/"}> Home page</Link>
            </div>
            {Auth.isUserAuthenticated() ? (
            <div className="top-bar-right">
                <button onClick={Auth.deauthenticateUser()}><Link to="/">Log out</Link></button>
            </div>
            ):(
            <div className="top-bar-right">
                <Link to="/login">Log in</Link>
                <Link to="/signup">Sign up</Link>
            </div>
            )}
        </div>
            <Switch>
                {Auth.isUserAuthenticated() ?
                <Route exact path="/" component={DashboardPage} />
                :
                <Route exact path="/" component={HomePage} />
                }
                <Route exact path="/signup" component={SignUpPage} />
                <Route exact path="/login" component={LoginPage} />
                
            </Switch>
    </div>
);

export default Base;