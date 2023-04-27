const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Image = model('Image', imageSchema);
module.exports = Image;