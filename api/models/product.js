const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//either i can use here new or at products 
var productSchema = Schema({
    name:String,
    price:Number
})

module.exports =mongoose.model('Product',productSchema);