const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },

    slot: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot' },

    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },

    seat: {
        seatNo: { type: String, required: true },

        seatType: {
            type: String,
            enum: ['normal', 'vip'],
            default: 'normal'
        },

        price: {
            type: Number,
            enum: [60000, 80000],
            default: 60000
        },
    },
    //=> seat type, price

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    //1: accept, 0: pending
    status: { type: Number, default: 0 }
});

module.exports = mongoose.model('Ticket', ticketSchema);