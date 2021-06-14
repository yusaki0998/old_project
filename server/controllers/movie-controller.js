const mongoose = require('mongoose');
const Movie = require('../models/movie-model');
const User = require('../models/user-model');
const moment = require('moment');

const createMovie = async (req, res) => {
    try {
        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        if (checkUser.role !== 'manager') {
            return res.status(403).json({
                message: "You don't have permission to access this"
            })
        }

        const { movieName, director, actor, genre, nation, ageRating, amountOfTime,
            showtimes, description, status } = req.body;

        if (!movieName || !director || !actor) {
            return res.status(301).json({
                message: "Missing information required to create movie"
            });
        }

        if (!moment(showtimes).isValid()) {
            return res.status(301).json({
                message: "Showtimes is in invalid format"
            });
        }

        const movie = new Movie({
            _id: new mongoose.Types.ObjectId(),
            movieName: movieName,
            director: director,
            actor: actor,
            genre: genre,
            nation: nation,
            ageRating: ageRating,
            amountOfTime: amountOfTime,
            showtimes: showtimes,
            description: description,
            coverImage: req.file.originalname,
            status: status
        });

        await movie.save();

        return res.status(201).json({
            message: "Movie created",
            data: movie
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getOngoingMovies = async (req, res) => {
    try {
        const findMovies = await Movie.find({
            status: 1
        }).exec();

        return res.status(200).json({
            message: "All ongoing movies found",
            data: findMovies
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getComingSoonMovies = async (req, res) => {
    try {
        const findMovies = await Movie.find({
            status: 0
        }).exec();

        return res.status(200).json({
            message: "All coming soon movies found",
            data: findMovies
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getMovie = async (req, res) => {
    try {
        const id = req.params.movieId;

        const findMovie = await Movie.findOne({
            _id: id,
        }).exec();

        return res.status(200).json({
            message: "Movie information found",
            data: findMovie
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

module.exports = {
    createMovie,
    getOngoingMovies,
    getComingSoonMovies,
    getMovie
}

