const mongoose = require('mongoose');

const seatSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    seatNo: { type: String, required: true },

    seatType: { type: String, required: true },

    price: { type: Number, required: true },

    //0:empty, 1:pending, 2:sold
    status: { type: Number, required: true },

    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' }
});

module.exports = mongoose.model('Seat', seatSchema);