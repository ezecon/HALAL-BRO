const express = require('express');
const User = require('../models/user');

const router = express.Router();


router.get('/:id', async (req, res) => {
    try {
        const item = await User.findById(req.params.id);
        
        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        res.status(200).json({item });
    } catch (err) {
        console.error(err); // More descriptive logging
        res.status(500).json({ success: false, message: "Server Error" });
    }
});


module.exports = router;
