// Backend/models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: 
  { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: 
  { 
    type: String, 
    required: false 
  },
  role:{
    type: String,
    default: "Customer"
},
  address: { 
    type: String, 
    required: false 
  },
  district: 
  { 
    type: String, 
    required: false 
  },
  number: { 
    type: String, 
    required: false 
  },
  image: 
  { 
    type: String, 
    required: false
   },
  password: { 
    type: String, 
    required: false
   }, 
  isVerified: { 
    type: Boolean, 
    default: false 
},
verificationCode: { 
    type: String ,
    required: true
},
  date:{type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);
