const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  
    },
    productId: {
        type: String,
        required: true,  
    },
    price: {
        type: Number,
        required: true,  
    },
    amount: {
        type: Number,
        required:true
    },
    userId: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('cart', cartSchema); 
