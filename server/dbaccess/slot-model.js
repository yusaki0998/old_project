const mongoose = require('mongoose');

const slotSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    slotName: { type: String, required: true },

    startTime: { type: Number, required: true },

    endTime: { type: Number, required: true }
});

module.exports = mongoose.model('Slot', slotSchema);