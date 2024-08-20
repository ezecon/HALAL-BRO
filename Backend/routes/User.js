const express = require('express');
const User = require('../models/user');
const cloudinary = require('../Cloudinary.js');
const multer = require('multer');

const router = express.Router();

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GET user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (err) {
        console.error('Error fetching user by ID:', err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// PUT update user by ID (including image upload)
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { displayName, address, number, email, district } = req.body;

        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Update fields
        user.displayName = displayName || user.displayName;
        user.address = address || user.address;
        user.number = number || user.number;
        user.email = email || user.email;
        user.district = district || user.district;

        // If an image is uploaded, handle it with Cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload_stream({
                resource_type: 'image',
                public_id: `users/${user._id}`, // Store in users folder with user ID
                overwrite: true,
            }, (error, result) => {
                if (error) {
                    console.error('Error uploading to Cloudinary:', error);
                    return res.status(500).json({ success: false, message: "Image upload failed" });
                }
                return result;
            });

            user.image = result.secure_url;
        }

        // Save updated user information
        await user.save();

        res.status(200).json({ success: true, message: "User updated successfully", user });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// DELETE user by ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

module.exports = router;
