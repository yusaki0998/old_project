const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    fullname: { type: String, required: true },

    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },

    phone: { type: String, required: true, unique: true, limit: 10},

    password: { type: String, required: true },

    dob: { type: Date, required: true },

    avatar: { type: String },

    //0:admin, 1:manager, 2:ticket seller, 3:customer
    role: {
        type: String,
        enum: ['admin', 'manager', 'ticket seller', 'customer'],
        default: 'customer'
    }
});

module.exports = mongoose.model('User', userSchema);