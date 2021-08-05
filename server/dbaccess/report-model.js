const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },

    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },

    slot: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot' },

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    income: { type: Number },

    paymentDate: { type: Date },
});

module.exports = mongoose.model('Report', reportSchema);