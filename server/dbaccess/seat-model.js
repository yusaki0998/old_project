const mongoose = require('mongoose');

const seatSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    seatNo: { type: String, required: true },

    seatType: {
        type: String,
        enum: ['normal', 'vip'],
        default: 'normal'
    },

    price: {
        type: Number,
    },

    //0:empty, 1:pending, 2:sold
    status: {
        type: String,
        enum: ['empty', 'pending', 'sold'],
        default: 'empty'
    },

    row: {
        type: Number
    },

    column: {
        type: Number
    }
});

module.exports = seatSchema;