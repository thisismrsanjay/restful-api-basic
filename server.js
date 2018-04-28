const express = require('express');
const app = express();
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const morgan = require('morgan');
const bodyParser =  require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/rest-api');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log('database connected'); 
});

app.use(morgan('dev'));
//static only for the requests coming at /uploads vimp
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//client access if you want to give access only to http://thecodingtemple.com 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/orders',orderRoutes);
app.use('/products',productRoutes);


app.use('*',(req,res,next)=>{
    const error = new Error('Not Found');
    error.status=404;
    next(error);
})
app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    })
})


app.listen(3000);