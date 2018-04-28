const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//either i can use here new or at products 
var productSchema = Schema({
    name:String,
    price:Number,
    productImage:{
        type:String,
        required:true,
        productImage:{type:String,default:'noimg.jpg'}
    }
})

module.exports =mongoose.model('Product',productSchema);