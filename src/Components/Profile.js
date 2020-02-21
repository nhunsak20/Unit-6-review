import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { logout } from '../redux/reducer';

const Profile = (props) => {

    const logout = () => {
    //something goes here
        axios.post('/api/logout').then(res => {
            props.logout()
            props.history.push('/')
        })
    }

    return(
        <div className='app-body'>
            <p>{props.user.id}</p>
            <p>{props.user.email}</p>
            <button className='input-container-button' onClick={logout}>Log out</button>
        </div>
    )
}

const mapStateToProps = reduxState => {
    const { user } = reduxState;
    return {
        user
    }
}

export default connect(mapStateToProps, { logout })(Profile);