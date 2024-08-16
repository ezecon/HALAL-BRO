const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: "Available",
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: '',
    }
});

module.exports = mongoose.model('Product', productSchema);
