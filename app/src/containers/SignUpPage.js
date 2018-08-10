import React from 'react';
import {Link} from 'react-router-dom';
import Axios from '../../node_modules/axios';

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            user: {
                email: '',
                name: '',
                password: ''
            }
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
        if(this.state.user.name && this.state.user.email && this.state.user.password) {
            // axios ajax call here
            Axios.post('/auth/signup', {
                name: this.state.user.name,
                email: this.state.user.email,
                password: this.state.user.email
            })
            .then(res=> console.log(res.body))
            .then(this.setState({user: {name: '', email: '', password: ''}}))
            .catch(err=> console.log(err));
        } else {
            alert('Please check that the whole form is filed out');
        }
    }



    render () {
        return (
            <div>
                <form>
                    <h2>Sign up</h2>
                    <label>
                        Name:
                        <input
                        type="text"
                        name="name"
                        value={this.state.user.name}
                        onChange={this.handleInputChange}
                        />
                    </label>
                    <br/>
                    <br/>
                    <label>
                        Email:
                        <input
                        type="email"
                        name="email"
                        value={this.state.user.email}
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
                        value={this.state.user.name}
                        onChange={this.handleInputChange}
                        />
                    </label>
                    <br/>
                    <br/>
                    <button onClick={this.handleFormSubmit}>Create Account</button>
                    <br/>
                    <br/>
                    <label>
                        Have an account already? <Link to={'/login'}>Login</Link>
                    </label>
                </form>
            </div>
        );
    }

}

export default SignUpPage;