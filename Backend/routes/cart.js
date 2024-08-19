const express = require('express');
const router = express.Router();
const Cart = require('../models/carts');

router.post('/', async(req, res)=>{
    const { name, productId, image,amount, size, price, userId} = req.body;
    try{
        const cart =  new Cart({name, productId, image, amount, size,  price, userId});
        const newCart = await cart.save();
        res.status(200).json({cart: newCart});
    }
    catch(err){
        console.error("Server error", err)
        res.status(500)
    }
})

router.get('/:id', async(req, res)=>{
    try{
        const carts = await Cart.find({userId: req.params.id});
        if(carts){
            res.status(200).json(carts)
        }
        else{
            res.status(404).json({message: "Not Found"})
        }
    }
    catch(err){
        res.status(500).json({message: "server error"})
    }
})

router.put('/single/:id', async (req, res) => {
    try {
        const cartId = req.params.id;
        const { amount } = req.body;

        const updatedCart = await Cart.findByIdAndUpdate(
            cartId,
            { amount }, 
            { new: true } 
        );

        if (!updatedCart) {
          return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item updated successfully', data: updatedCart });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.put('/single1/:id', async (req, res) => {
    try {
        const cartId = req.params.id;
        const { size } = req.body;

        const updatedCart = await Cart.findByIdAndUpdate(
            cartId,
            { size }, 
            { new: true } 
        );

        if (!updatedCart) {
          return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item updated successfully', data: updatedCart });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



router.delete('/single/:id', async (req, res) => {
    try {
      const cart = await Cart.findByIdAndDelete(req.params.id);
  
      if (!cart) {
        return res.status(404).json({ message: "Item not found" });
      }
  
      res.status(200).json({ message: "Item deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.delete('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Attempt to delete the cart item associated with the userId
        const deletedCart = await Cart.deleteMany({ userId });

        if (!deletedCart) {
            return res.status(404).json({ message: 'Item not found for this user' });
        }    
   
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

  


module.exports = router;