const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: String,
  name: String,
  password: String,
  email: String,
  createdAt: String,
  profilePic: String,
  about: String,
  contact: {
    email: String,
    facebook: String,
    twitter: String,
    instagram: String,
  },
});

module.exports = model('User', userSchema);
