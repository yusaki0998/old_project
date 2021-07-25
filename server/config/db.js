require("dotenv").config();
const mongoose = require('mongoose');

const uri =
    "mongodb+srv://" +
    process.env.MONGO_ATLAS_USER +
    ":" +
    process.env.MONGO_ATLAS_PW +
    "@capstonecluster.e4xd9.mongodb.net/ot-bm?retryWrites=true&w=majority";

const connection = mongoose
    .connect(uri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("OK!");
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = connection;

