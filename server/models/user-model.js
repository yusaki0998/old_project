const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    username: { type: String, required: true, unique: true, },

    customerName: { type: String, required: true },

    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },

    phoneNumber: { type: String, required: true, unique: true, },

    password: { type: String, required: true },

    birthDate: { type: Date, required: true },

    //0:admin, 1:manager, 2:ticket seller, 3:customer
    role: { type: Number, default: 3 }
});

module.exports = mongoose.model('User', userSchema);