const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },

    slot: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot' },

    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },

    seat: { type: mongoose.Schema.Types.ObjectId, ref: 'Seat' },
    //=> seat type, price

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Ticket', ticketSchema);