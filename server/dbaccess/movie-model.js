const mongoose = require('mongoose');

//let urlHost = `${process.env.PROTOCOL}://${process.env.HOST_NAME}:${process.env.PORT}`;

const movieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    movieName: { type: String, required: true, },

    director: { type: String, required: true, },

    actor: { type: String, required: true, },

    genre: { type: String },

    nation: { type: String },

    // phim dành cho mọi lứa tuổi (dán nhãn là P), 
    // phim cấm trẻ em dưới 13 tuổi (C13), 
    // phim không dành cho người dưới 16 tuổi (C16) 
    // phim cấm khán giả dưới 18 tuổi (C18)
    ageRating: {
        type: String, 
        enum: ['P', 'C13', 'C16', 'C18'],
        default: 'P'
    },

    amountOfTime: { type: Number },

    showtimes: { type: Date },

    description: { type: String },

    coverImage: { type: String, default: `uploads/coversample.png` /*`${urlHost}/uploads/coversample.png`*/ },

    //0: phim sap chieu, 1: phim dang chieu
    status: { type: Number, default: 0 },
});

movieSchema.index({
    movieName: 'text',
    director: 'text',
    actor: 'text',
});

module.exports = mongoose.model('Movie', movieSchema);