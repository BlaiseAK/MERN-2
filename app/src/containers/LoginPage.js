import React from 'react';
import {Link} from 'react-router-dom';
import API from '../utils/API'


class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            email: '',
            password: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    handleInputChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if(this.state.email && this.state.password) {
            // axios ajax call here
            API.login({
                email: this.state.email,
                password: this.state.password
            })
            .then(res=> console.log(res))
            .then(this.setState({email: '', password: ''}))
            .catch(err=> console.log(err.response));
        } else {
            alert('Please check that all the fields were filled out');
        }
        console.log(`email: ${this.state.email}`);
        console.log(`password: ${this.state.password}`);
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