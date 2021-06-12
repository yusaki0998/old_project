require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
//const db = require('./config/db');
const morgan = require('morgan');

//Declare routes
const userRoute = require('./routes/user-route');

//Database connect
const uri = "mongodb+srv://" + process.env.MONGO_ATLAS_USER + ":"
    + process.env.MONGO_ATLAS_PW +
    "@capstonecluster.e4xd9.mongodb.net/ot-bm?retryWrites=true&w=majority"

mongoose.connect(uri,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("OK!");
    })
    .catch(err => {
        console.log(err);
    })

//middleware section
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use('/api/v1/users', userRoute);

//error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;