const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');


router.get('/',(req,res,next)=>{
    Product.find((err,data)=>{
        if(err){
            res.status(500).json({error:err})
        }else{
            res.status(200).json(data)
        }
    });
})
//price is a number type
router.post('/',(req,res,next)=>{
    const product = new Product({
        name:req.body.name,
        price:req.body.price
    })
    product.save((err,result)=>{
        if(err){
            res.status(500).json({error:err});
        }else{
            res.status(200).json({result})
        }
    });
})

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    Product.findById(id,(err,data)=>{
        if(err){
            res.status(500).json({error:err});
        }else{
            //maybe we'll get null which might not cause an error
            if(data){
                res.status(200).json({data})
            }else{
                res.status(404).json({message:'no product of given id'})
            }
        }
    });
})

router.patch('/:productId',(req,res,next)=>{
    const id = req.params.productId;   
    Product.update({_id:id},{name:req.body.newName,price:req.body.newPrice},(err,data)=>{
        if(err){
            res.status(500).json(err);
        }else{
            res.status(200).json(data);
        }
    })
})
router.delete('/:productId',(req,res,next)=>{
    const id= req.params.productId;
    Product.remove({_id:id},(err,data)=>{
        if(err){
            res.status(500).json(err);
        }else{
            res.status(200).json(data)
        }
    })
})



module.exports = router;