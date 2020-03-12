const { Schema, model } = require('mongoose');
const PLM = require('passport-local-mongoose');

const puppySchema = new Schema(
  {
    message: String,
    state: String,
    name: String,
    owner: { type : Schema.Types.ObjectId, ref: 'User' } //23412aifasfasdiofadifusd
  },
  {
    timestamps: true,
    versionKey: false
  },
);


module.exports = model('Puppy', puppySchema);
