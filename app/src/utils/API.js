import Axios from 'axios';


export default {
    signup: function (signupData) {
        return Axios.post('/auth/signup', signupData);
    },
    login: function(loginData) {
        return Axios.post('/auth/login', loginData);
    },
    dashboard: function() {
        return Axios.get('/api/dashboard');
    }
}