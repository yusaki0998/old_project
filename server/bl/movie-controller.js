const mongoose = require('mongoose');
const Movie = require('../dbaccess/movie-model');
const User = require('../dbaccess/user-model');
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

const updateMovie = async (req, res) => {
    try {
        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        if (checkUser.role !== 'manager') {
            return res.status(403).json({
                message: "You don't have permission to access this"
            })
        }

        const id = req.params.movieId;

        const movie = await Movie.findOne({
            _id: id
        }).exec();

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        const { movieName, director, actor, genre, nation, ageRating, amountOfTime,
            showtimes, description, status } = req.body;

        if (req.file) {
            movie.coverImage = req.file.originalname;
        }

        if (movieName) {
            movie.movieName = movieName;
        }

        if (director) {
            movie.director = director;
        }

        if (actor) {
            movie.actor = actor;
        }

        if (genre) {
            movie.genre = genre;
        }

        if (nation) {
            movie.nation = nation;
        }

        if (ageRating) {
            movie.ageRating = ageRating;
        }

        if (amountOfTime) {
            movie.amountOfTime = amountOfTime;
        }

        if (showtimes && !moment(showtimes).isValid()) {
            movie.showtimes = showtimes;
        }

        if (description) {
            movie.description = description;
        }

        if (status) {
            movie.status = status;
        }

        await movie.save();

        return res.status(200).json({
            message: "Movie updated",
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

const deleteMovie = async (req, res) => {
    try {
        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        if (checkUser.role !== 'manager') {
            return res.status(403).json({
                message: "You don't have permission to access this"
            })
        }

        const id = req.params.movieId;

        const deleteMovie = await Movie.findByIdAndDelete(id).exec();

        if (!deleteMovie) {
            return res.status(404).json({
                message: "Id not found cannot delete movie"
            });
        }

        return res.status(200).json({
            message: "Movie deleted",
            data: deleteMovie
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const search = async (req, res) => {
    try {
        const input = req.body.input;

        const findMovies = await Movie.find({
            $and: [
                {
                    $or: [
                        { movieName: new RegExp(input, 'i') }
                    ]
                }
            ]
        }).limit(5).exec();

        if(!findMovies || findMovies.length === 0){
            return res.json([]);
        }

        return res.status(200).json({
            message: "Movies found",
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

module.exports = {
    createMovie,
    getOngoingMovies,
    getComingSoonMovies,
    getMovie,
    updateMovie,
    deleteMovie,
    search
}

