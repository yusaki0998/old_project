const mongoose = require('mongoose');

const seatMapSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    // seats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat' }]

    seats: [{
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

        //0:empty, 1:pending, 2:sold
        status: {
            type: String,
            enum: ['empty', 'pending', 'sold'],
            default: 'empty'
        },
    }]
});

module.exports = mongoose.model('SeatMap', seatMapSchema);