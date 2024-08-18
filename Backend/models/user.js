// Backend/models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, required: false }, // Firebase UID
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: false },
  password: { type: String, required: false }, // Store hashed password
  googleId: { type: String, required: false }, // Google ID
});

module.exports = mongoose.model('User', userSchema);
