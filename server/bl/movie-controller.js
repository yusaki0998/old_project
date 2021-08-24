const mongoose = require('mongoose');
const Movie = require('../dbaccess/movie-model');
const Schedule = require('../dbaccess/schedule-model');
const User = require('../dbaccess/user-model');
const cloudinary = require('../utils/cloudinary');
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

        const cloud = await cloudinary.uploader.upload(req.file.path);

        const { movieName, director, actor, genre, nation, ageRating, amountOfTime,
            showtimes, description, status } = req.body;

        if (!movieName || !director || !actor || !ageRating || !genre) {
            return res.status(301).json({
                message: "Missing information required to create movie"
            });
        }

        if (amountOfTime < 0) {
            return res.status(301).json({
                message: "Movie amount of time can't be smaller than 0"
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
            coverImage: cloud.secure_url,
            status: status
        });

        await movie.save();

        return res.status(201).json({
            message: "Movie created",
            data: movie
        });

    } catch (error) {
        console.error(error);
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
        })
            .sort({ showtimes: 1 })
            .exec();

        if (!findMovies || findMovies.length === 0) {
            return res.status(404).json({
                message: "Movies not found"
            });
        }

        return res.status(200).json({
            message: "All ongoing movies found",
            data: findMovies
        });

    } catch (error) {
        console.error(error);
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
        })
            .sort({ showtimes: 1 })
            .exec();

        if (!findMovies || findMovies.length === 0) {
            return res.status(404).json({
                message: "Movies not found"
            });
        }

        return res.status(200).json({
            message: "All coming soon movies found",
            data: findMovies
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getMovie = async (req, res) => {
    try {
        const id = req.params.movieId;

        const findMovie = await Movie.findById(id).exec();

        if (!findMovie) {
            return res.status(404).json({
                message: "Invalid id, movie not found"
            });
        }

        return res.status(200).json({
            message: "Movie found",
            data: {
                movie: findMovie,
            }
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

        let cloud;
        if (req.file) {
            cloud = await cloudinary.uploader.upload(req.file.path);
            movie.coverImage = cloud.secure_url;
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
            if (amountOfTime < 0) {
                return res.status(301).json({
                    message: "Movie amount of time can't be smaller than 0"
                });
            }
            else {
                movie.amountOfTime = amountOfTime;
            }
        }

        if (showtimes) {
            if (!moment(showtimes).isValid()) {
                return res.status(301).json({
                    message: "Showtimes is in invalid format"
                });
            }
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

        const checkMovieSchedule = await Schedule.find({
            movie: id
        }).exec();

        if (checkMovieSchedule.length !== 0) {
            return res.status(409).json({
                message: "Cannot delete movie ! You must delete all movie schedule before delete this movie"
            });
        }

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

        const findMovies = await Movie.find(
            {
                $or: [
                    { movieName: { $regex: '.*' + input + '.*', $options: 'i' } },
                    { director: { $regex: '.*' + input + '.*', $options: 'i' } },
                    { actor: { $regex: '.*' + input + '.*', $options: 'i' } }
                ]
            }
            //$text: { $search: input, $caseSensitive: false }
        ).exec();

        if (!findMovies || findMovies.length === 0) {
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

