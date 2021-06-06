const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    movieName: { type: String, required: true, },

    director: { type: String, required: true, },

    actor: { type: String, required: true, },

    genre: { type: String },

    nation: { type: String },

    ageRating: { type: String },

    amountOfTime: { type: String, required: true },

    price: { type: Number, required: true },

    description: { type: String },

    coverImage: { type: String },

    trailerUrl: { type: String },

    //0: phim sap chieu, 1: phim dang chieu
    status: { type: Number, required: true, default: 0 },

    slot: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Slot' }]
});

module.exports = mongoose.model('Movie', movieSchema);