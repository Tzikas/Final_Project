import React, { Component } from 'react';
import actions from '../../services/index'
import Axios from 'axios';


class Home extends Component {
  async componentDidMount() {
    
    actions.getPuppies().then(myPuppy=> {
      console.log(myPuppy)
    })

    Axios.get("https://dog.ceo/api/breeds/image/random").then(puppy => {
      console.log(puppy)
    })
  }
  render() {
    return (
      <div>
          hello everyone
      </div>
    );
  }
}

export default Home;
