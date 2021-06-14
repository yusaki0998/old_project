const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    movieName: { type: String, required: true, },

    director: { type: String, required: true, },

    actor: { type: String, required: true, },

    genre: { type: String },

    nation: { type: String },

    ageRating: { type: String },

    amountOfTime: { type: String },

    showtimes: { type: Date },

    description: { type: String },

    coverImage: { type: String, default: `../uploads/coversample.jpg` },

    //0: phim sap chieu, 1: phim dang chieu
    status: { type: Number, default: 0 },
});

module.exports = mongoose.model('Movie', movieSchema);