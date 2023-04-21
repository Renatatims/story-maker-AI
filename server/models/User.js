const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

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
  storiesAI: [
    {
      type: Schema.Types.ObjectId,
      ref: "Story",
    },
  ],
});

// middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// hashed password compared with user's input
userSchema.methods.isCorrectPassword = async function (password) {
  console.log(password);
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;