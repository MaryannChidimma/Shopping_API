const express  = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/order')
  mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true});
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
    
});
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use('/products', productRoutes);
app.use('/order', orderRoutes);

app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use(( error, req, res, callack)=>{
    
    res.status(error.status || 500);
   res.json({
       error: {message: error.message}
   });
});
// app.use((req, res, next) =>{
//     res.status(200).json({
//         message:'it worked'
//     })
//})
module.exports = app;