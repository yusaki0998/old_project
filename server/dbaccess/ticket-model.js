const mongoose = require('mongoose');
const Seat = require('./seat-model');

const ticketSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    schedule: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' },

    seat: { type: { Seat } },

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    //1: accept, 0: pending
    status: { type: Number, default: 0 },

    bookedDate: { type: Date, default: Date.now() },

    paymentDate: { type: Date },
});

module.exports = mongoose.model('Ticket', ticketSchema);