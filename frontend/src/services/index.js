import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production'
  //? (baseURL = 'here should be your production endpoint')
  ? (baseURL = "https://chabascript.herokuapp.com")
  : (baseURL = 'http://localhost:5000');

const service = axios.create({ withCredentials: true, baseURL });

const actions = {
  isLoggedIn: async () => {
    return await service.get('/is-logged-in')
  },
  signUp: async (user) => {
    return await service.post('/signup', user)
  },
  logIn: async (user) => {
    return await service.post('/login', user)
  },
  logOut: async () => {
    return await service.get('/logout')
  },
  getPuppies: async () => {
    return await axios.get("https://dog.ceo/api/breeds/image/random")
  },
  savePuppy: async (puppy) => {
    return await service.post('/save-puppy', puppy)
  },
  getProfile: async () => {
    return await service.get('/profile')
  },
  handleUpload: (theFile) => {  //The one that saves to cloudinary 
    console.log('file in service: ', theFile)
    return service.post('/upload', theFile)
      .then(res => res.data)
      .catch(err => console.error(err));
  },

  saveNewThing (image) { //The one that saves to your databse 
    // console.log('new thing is: ', image)
    return service.post('/image/create', image)
      .then(res => res.data)
      .catch(err => console.error(err));
  },

  getAllImages: async () => {
    return await service.get('/all-images')
  }

};

export default actions;
