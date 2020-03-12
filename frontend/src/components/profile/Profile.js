import React, { Component } from 'react';
import actions from '../../services';

class Profile extends Component {
    
    componentDidMount(){
        actions.getProfile().then(res => {
            console.log(res)
        })
    }

    render(){
        let props = this.props; 
        if(!props.user.email){ 
            props.history.push('/log-in') 
        }   
        return (
            <div>
                Profile HEyall!!!
                Welcome {props.user.email} !!! 
            </div>
        );
    }
}

export default Profile;