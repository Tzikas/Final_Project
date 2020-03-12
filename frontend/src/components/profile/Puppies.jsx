import React, { Component } from 'react';
import Axios from 'axios';
import actions from '../../services';

class Puppies extends Component {

    state = {
        puppy : {}
     }

    componentDidMount(){
        Axios.get('https://dog.ceo/api/breeds/image/random')
            .then(res => this.setState({puppy:res.data}))
    }

    handlePost = () => {
        //Axios.post('https://chabascript.herokuapp.com/save-puppy', {withCre})
        actions.savePuppy(this.state.puppy)
    }

    render() {
        return (
            <div>
                <h1>Puppies</h1>
                <img src={this.state.puppy.message} />
                <button onClick={this.handlePost}>Add Puppy</button>
            </div>
        );
    }
}

export default Puppies;