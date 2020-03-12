import React, { Component } from 'react';
import actions from '../../services/index.js'

class imageUpload extends Component {
    state = {
        name: "",
        description: "",
        imageUrl: "",
        allTheImages: []
    };

    componentDidMount(){
        //page loads, i want to grab ALL Images from the DB 
        actions.getAllImages().then(allTheImages => {
            this.setState({allTheImages:allTheImages.data.allImagesFromMyDatabase})
        })
    }

    showImages = () => {
        return this.state.allTheImages.map(eachImage => {
            return <img src={eachImage.imageUrl} />
        })
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    // this method handles just the file upload
    handleFileUpload = e => {
        console.log("The file to be uploaded is: ", e.target.files[0]);

        const uploadData = new FormData();
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new thing in '/api/things/create' POST route
        uploadData.append("imageUrl", e.target.files[0]);
        
        actions.handleUpload(uploadData) //This is where we will go cloudinary.com and save our pic 
        .then(response => {
            console.log('response is: ', response);
            // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
            this.setState({ imageUrl: response.secure_url }); //This is the url we got back from cloudinary
          })
          .catch(err => {
            console.log("Error while uploading the file: ", err);
          });
    }

    // this method submits the form
    handleSubmit = e => {
        e.preventDefault();
        
        actions.saveNewThing(this.state) //This is where we go to our database and save our link
        .then(res => {
            console.log('added: ', res);
            let copyOfAllImages = [...this.state.allTheImages]
            copyOfAllImages.unshift(res)
            this.setState({allTheImages: copyOfAllImages})
            // here you would redirect to some other page 
        })
        .catch(err => {
            console.log("Error while adding the thing: ", err);
        });
    }  
    
    render() {
        return (
          <div>
            <h2>New Thing</h2>
            <form onSubmit={e => this.handleSubmit(e)}>
                <label>Name</label>
                <input 
                    type="text" 
                    name="name" 
                    value={ this.state.name } 
                    onChange={ e => this.handleChange(e)} />
                <label>Description</label>
                <textarea 
                    type="text" 
                    name="description" 
                    value={ this.state.description } 
                    onChange={ e => this.handleChange(e)} />
                <input 
                    type="file" 
                    onChange={(e) => this.handleFileUpload(e)} /> 
                <button type="submit">Save new thing</button>
            </form>

            <h3>List of all pics i've saved:</h3>
            {this.showImages()}
          </div>
        );
    }
}

export default imageUpload;