// Backend/models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, required: false }, // Firebase UID
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: false },
  address: { type: String, required: false },
  district: { type: String, required: false },
  number: { type: String, required: false },
  image: { type: String, required: false },
  password: { type: String, required: false }, 
  googleId: { type: String, required: false }, 
  date:{type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);
