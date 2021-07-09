const mongoose = require('mongoose');
const Seat = require('./seat-model');

const seatMapSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    name: { type: String },

    seats: { type: [Seat] }
});

module.exports = mongoose.model('SeatMap', seatMapSchema);