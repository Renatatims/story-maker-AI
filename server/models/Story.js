const { Schema, model} = require('mongoose');

const storySchema = new Schema({
  stories: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
});

const Story = model("Story", storySchema);
module.exports = Story;