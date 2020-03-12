const { Schema, model } = require('mongoose');


const imageSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
  })


module.exports = model('Image', imageSchema);
