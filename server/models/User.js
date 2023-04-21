const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  storiesAI: [{
    type: Schema.Types.ObjectId,
    ref: "Story",
  }],
});

const User = model("User", userSchema);

module.exports = User;