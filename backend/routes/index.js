const router = require('express').Router();
const User = require('../models/User')
const Puppy = require('../models/Puppy')
const Image = require('../models/Image')

const Axios = require('axios')

const uploader = require('../config/cloudinary-setup');

router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {
    // console.log('file is: ', req.file)

    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    console.log(req.file, ' req dot file')
    // get secure_url from the file object and save it in the 
    // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
    res.json({ secure_url: req.file.secure_url });
})



//the otherside of this:  return service.post('/image/create', image)

router.post('/image/create', (req, res, next) =>{
  Image.create(req.body).then(data => res.json(data)).catch(err => res.json(err))
})


router.get('/all-images', (req, res, next) => {
  Image.find().then(allImagesFromMyDatabase => {
    res.json({allImagesFromMyDatabase})
  }).catch(err => res.json({err}))
 })























router.get('/', (req, res, next) => {
  
  res.status(200).json({ msg: 'Working' });
});


router.post('/save-puppy', (req, res, next) => {
  console.log(req.body, req.user) //me and my puppy 
//   message: String,
//   name: String,
//   owner: { type : Schema.Types.ObjectId, ref: 'User' } //23412aifasfasdiofadifusd

  let pup = {
    message: req.body.message,
    name: 'Cujo',
    owner: req.user._id
  }

  Puppy.create(pup).then(res => {
    console.log(res)
  })

  User.findByIdAndUpdate(req.user._id, {puppy: req.body.message}).then(res => {
    res.status(200).json({ puppy: 'Working' });
  })
})



module.exports = router;
