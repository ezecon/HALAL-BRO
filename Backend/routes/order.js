const express = require('express');
const router = express.Router();
const Orders = require('../models/orders');

router.post('/', async(req, res)=>{
    const { userId, items, total,number, address} = req.body;
    try{
        const order =  new Orders({userId, items, total,number, address});
        const newOrder = await order.save();
        res.status(200).json({order: newOrder});
    }
    catch(err){
        console.error("Server error", err)
        res.status(500)
    }
})

router.get('/:id', async(req, res)=>{
    try{
        const order = await Orders.find({userId: req.params.id});
        if(order){
            res.status(200).json(order)
        }
        else{
            res.status(404).json({message: "Not Found"})
        }
    }
    catch(err){
        res.status(500).json({message: "server error"})
    }
})
router.delete('/:id', async(req, res)=>{
    try{
        const order = await Orders.findByIdAndDelete(req.params.id);
        if(order){
            res.status(200).json(order)
        }
        else{
            res.status(404).json({message: "Not Found"})
        }
    }
    catch(err){
        res.status(500).json({message: "server error"})
    }
})
router.get('/', async(req, res)=>{
    try{
        const order = await Orders.find();
        if(order){
            res.status(200).json(order)
        }
        else{
            res.status(404).json({message: "Not Found"})
        }
    }
    catch(err){
        res.status(500).json({message: "server error"})
    }
})

router.put('/:id', async (req, res) => {
    try {
      const updatedOrder = await Orders.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: 'Error updating order status', error });
    }
  });
  

module.exports = router;