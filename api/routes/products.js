const express = require('express');
const mongoose = require('mongoose');
const product = require('../models/product');
const router = express.Router();
const Product = require('../models/product')
router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: 'this handles get request in /product'
    });
});
router.post('/', (req, res, next)=>{
     const product = new Product({
        _id :new mongoose.Types.ObjectId(),
        name :req.body.name,
        price :req.body.price
     });
     product.save().then(result=>{
      console.log(result)
     })
     .catch(err => console.log(err));
    res.status(201).json({
        message: 'this handles post request in /product',
        createdProperty: product 
    });
});

router.get('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    Product.findById(id)
    
    .exec()
    .then(doc => {
        console.log(doc)
    res.status(200).json({doc})
})
    .catch(err => {console.log(err)
        res.status(500).json({error: err})
    }
    )
});

router.patch('/:productId', (req, res, next) =>{
   res.status(200).json({
       message : 'patch a file'
   })
});

router.delete('/:productId', (req, res, next) =>{
    res.status(200).json({
        message : 'delete a file'
    })
 });


module.exports = router;