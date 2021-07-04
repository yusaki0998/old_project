const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    roomName: { type: String, required: true, unique: true },

    seatMap: { type: mongoose.Schema.Types.ObjectId, ref: 'SeatMap' },
});

module.exports = mongoose.model('Room', roomSchema);