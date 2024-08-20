const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../Cloudinary');
const Items = require('../models/product.js');

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a new product
router.post('/', upload.single('photo'), async (req, res) => {
    const { name, description, price, category } = req.body;
    let photoUrl = null;

    try {
        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                    if (error) {
                        console.error("Cloudinary Upload Error: ", error);
                        reject(error);
                    } else {
                        console.log("Cloudinary Upload Success: ", result);
                        resolve(result);
                    }
                }).end(req.file.buffer);
            });

            photoUrl = result.secure_url;
        }

        const item = new Items({
            name,
            description,
            price,
            category,
            image: photoUrl 
        });
        const newItem = await item.save();
        res.status(200).json({ message: "Product Uploaded", newItem });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const items = await Items.find();
        res.status(200).json({ success: true, data: items });
    } catch (err) {
        console.error(err); // More descriptive logging
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const item = await Items.findById(req.params.id);
        
        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        res.status(200).json({ success: true, data: item });
    } catch (err) {
        console.error(err); // More descriptive logging
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const item = await Items.findByIdAndDelete(req.params.id);
        
        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        res.status(200);
    } catch (err) {
        console.error(err); // More descriptive logging
        res.status(500).json({ success: false, message: "Server Error" });
    }
});


module.exports = router;
