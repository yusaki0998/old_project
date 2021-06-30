const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },

    slot: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot' },

    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },

    roomSeats: [{
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

        status: {
            type: String,
            enum: ['empty', 'pending', 'sold'],
            default: 'empty'
        },
    }], select: false,

    showDate: { type: Date },

    week: { type: Number },

    startDay: { type: Date },

    endDay: { type: Date },

    
});

module.exports = mongoose.model('Schedule', scheduleSchema);