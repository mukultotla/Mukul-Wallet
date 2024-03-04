const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

module.exports = mongoose.model("User", UserSchema);
