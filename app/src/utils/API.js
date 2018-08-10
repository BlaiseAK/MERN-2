import Axios from 'axios';


export default {
    signup: function (signupData) {
        return Axios.post('/signup', signupData);
    },
    login: function(loginData) {
        return Axios.post('/login', loginData);
    }
}