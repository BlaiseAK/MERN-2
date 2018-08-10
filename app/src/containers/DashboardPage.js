import React from 'react';
import Auth from '../modules/Auth';
import Axios from '../../node_modules/axios';

class DashboardPage extends React.Component {

    state = {
        secretData: ''
    };

    componentDidMount() {
        Axios.get('api/dashboard', )
    }
}