import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';
import Base from './containers/Base.js';
import Auth from './modules/Auth';
import DashboardPage from './containers/DashboardPage';
import Homepage from './containers/HomePage';


const routes = {

    component: Base,
    childRoutes: [
        {
            path: '/',
            getComponent: (location, callback) => {
                if(Auth.isUserAuthenticated()) {
                    callback(null, DashboardPage);
                } else {
                    callback(null, Homepage);
                }
            }
        },
        {
            path: '/login',
            component: LoginPage
        },
        {
            path: '/signup',
            component: SignUpPage
        },
        {
            path: '/logout',
            onEnter: (nextState, replace) => {
                Auth.deauthenticateUser();

                replace('/');
            }
        }
    ]
};

export default routes;