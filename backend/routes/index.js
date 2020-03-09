const router = require('express').Router();
const User = require('../models/User')

router.get('/', (req, res, next) => {
  res.status(200).json({ msg: 'Working' });
});


router.post('/save-puppy', (req, res, next) => {
  console.log(req.body, req.user) //me and my puppy 
  User.findByIdAndUpdate(req.user._id, {puppy: req.body.message}).then(res => {
    res.status(200).json({ puppy: 'Working' });
  })
})

module.exports = router;
