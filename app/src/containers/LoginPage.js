import React from 'react';
import {Link} from 'react-router-dom';
import Axios from '../../node_modules/axios';


class LoginPage extends React.Component {
    state = {
        errors: {},
        email: '',
        password: ''
        
    };

    handleInputChange = event => {
        const name = event.target.name;
        let value = event.target.value
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if(this.state.email && this.state.password) {
            // axios ajax call here
            Axios.post('/auth/login', {
                email: this.state.email,
                password: this.state.password
            })
            .then(res=> console.log(res.body))
            .then(this.setState({user: {email: '', password: ''}}))
            .catch(err=> console.log(err));
        } else {
            alert('Please check that all the fields were filled out');
        }
    }

    render () {return (
            <div>
                <form>
                    <h2>Login</h2>
                    <label>
                        Email:
                        <input
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        />
                    </label>
                    <br/>
                    <br/>
                    <label>
                        Password:
                        <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        />
                    </label>
                    <br/>
                    <br/>
                    <button onClick={this.handleFormSubmit}>Login</button>
                    <br/>
                    <br/>
                    <label>
                        Don't have an account <Link to={'/signup'}>Create an Account</Link>
                    </label>
                </form>
            </div>
        )}
}

export default LoginPage;