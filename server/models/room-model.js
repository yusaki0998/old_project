const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    roomName: { type: String, required: true },

    movie: { type: String, required: true, ref: 'Movie' } 
});

module.exports = mongoose.model('Room', roomSchema);