const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,  
    },
    items: [
        {
          _id: mongoose.Schema.Types.ObjectId,
          name: String,
          productId: mongoose.Schema.Types.ObjectId,
          price: Number,
          amount: Number,
          size: String,
          userId: mongoose.Schema.Types.ObjectId,
          image: String,
          date: Date
        }
      ],
    total: {
        type: Number,
        required: true,  
    },
    address:{
        type: String,
        required: true,  
    },
    number:{
        type: String,
        required: true,  
    },
    status:{
        type: String,
        default: "Pending" 
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('ordes', orderSchema); 
