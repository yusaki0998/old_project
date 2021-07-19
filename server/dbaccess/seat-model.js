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

    status: {
        type: String,
        enum: ['empty', 'pending', 'sold', 'chosen'],
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