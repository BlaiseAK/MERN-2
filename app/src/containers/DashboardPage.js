import React from 'react';
import API from '../routes';

class DashboardPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            secretData: ''
        };
    }
    componentDidMount() {
        API.dashboard()
            .then(res => this.setState({secretData: res.message}))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <h3>You should get access to this page only after Authentication.</h3>
                {this.props && <div>{this.state.secretData}</div>}
            </div>
        )
    }
}

export default DashboardPage;