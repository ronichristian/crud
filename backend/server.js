require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const productsRoute = require('./routes/products');
const storessRoute = require('./routes/stores');

const app = express();

// express app
app.use(express.json());

// middleware
app.use((req, res, next) => {
    next();
})

// routes
app.use('/api/products', productsRoute);
app.use('/api/stores', storessRoute);

// connect to db
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        // listen for requests 
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB & Listening to port: ', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error);
    });
