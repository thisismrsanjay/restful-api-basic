const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Order.find((err, data) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(data);
        }
    }).populate('product')
})
//if you will not get a productid it will return null
router.post('/', (req, res, next) => {
    Product.findById(req.body.productId, (err, data) => {
        //null
        if (err || !data) {
            res.status(500).json(err);
        } else {
            const order = new Order({
                quantity: req.body.quantity,
                product: req.body.productId
            })
            order.save((err, result) => {
                if (err) {
                    res.status(500).json(err)
                } else {
                    res.status(200).json(result)
                }
            })
        }
    })

})


router.get('/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId,(err,data)=>{
        if(err){
            res.status(400).json(err);
        }else{
            res.status(200).json(data);
        }
    }).populate('product')
})
router.delete('/:orderId', (req, res, next) => {
    Order.remove({_id:req.params.orderId},(err,data)=>{
        if(err){
            res.status(500).json(err);
        }else{
            res.status(200).json(data);
        }
    })
})


module.exports = router;