const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },

    slot: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot' },

    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },

    showDate: { type: Date },

    week: { type: Number },

    startDay: { type: Date },

    endDay: { type: Date },
});

module.exports = mongoose.model('Schedule', scheduleSchema);