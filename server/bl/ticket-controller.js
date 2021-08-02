const mongoose = require('mongoose');
const Ticket = require('../dbaccess/ticket-model');
const Schedule = require('../dbaccess/schedule-model');
const User = require('../dbaccess/user-model');
const Movie = require('../dbaccess/movie-model');

const getMovieSchedule = async (req, res) => {
    try {
        const checkUser = req.userData

        if (checkUser === null) {
            return res.status(401).json({
                message: "You must login to book ticket"
            });
        }

        const id = req.params.movieId;

        const findMovie = await Movie
            .findById(id)
            .exec();

        if (!findMovie) {
            return res.status(404).json({
                message: "Invalid id, movie not found"
            });
        }

        const findSchedule = await Schedule.find({
            movie: id,
            showDate: {
                $gte: Date.now()
            }
        })
            .sort({ showDate: 1 })
            .select('-roomSeats')
            .populate('room', 'roomName')
            .populate('slot')
            .exec();

        let scheduleDate = [];
        findSchedule.forEach(schedule => {
            scheduleDate.push(schedule.showDate);
        });

        const result = scheduleDate.map(function (date) {
            return date.getTime()
        }).filter(function (date, i, array) {
            return array.indexOf(date) === i;
        }).map(function (time) {
            return new Date(time);
        });

        return res.status(200).json({
            message: "Movie schedule found",
            data: {
                movie: findMovie,
                schedule: findSchedule,
                date: result
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getScheduleSeats = async (req, res) => {
    try {
        const id = req.params.scheduleId;

        const findSchedule = await Schedule
            .findById(id)
            .select('+roomSeats')
            .populate('movie', 'movieName', 'coverImage')
            .populate('room', 'roomName')
            .populate('slot')
            .exec();

        if (!findSchedule) {
            return res.status(404).json({
                message: "Schedule not found"
            });
        }

        return res.status(200).json({
            message: "Schedule found",
            data: findSchedule
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const createTicket = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        const id = req.params.scheduleId;

        const seatChosens = req.body.seats;

        if (!seatChosens) {
            return res.status(301).json({
                message: "Seat chosen is not valid",
                data: null
            });
        }

        if (!Array.isArray(seatChosens)) {
            return res.status(409).json({
                message: "Seat chosen is not an array",
                data: null
            });
        }

        const checkLimit = await Ticket.find({
            user: currentUser,
            schedule: id
        }).exec();

        if (checkLimit.length > 8 && checkUser.role === 'customer') {
            return res.status(301).json({
                message: "You have reached your limit (8) to book this movie ticket"
            });
        }

        if (seatChosens.length > 8 && checkUser.role === 'customer') {
            return res.status(301).json({
                message: "You cannot choose more than 8 seats"
            });
        }

        const findSchedule = await Schedule.findById(id).exec();

        const seatNumber = seatChosens.map(seat => seat.seatNo);

        let buyTicket = [];
        let result;
        if (checkUser.role === 'customer') {
            seatChosens.forEach(seat => {
                buyTicket.push({
                    _id: new mongoose.Types.ObjectId(),
                    schedule: findSchedule._id,
                    seat: seat,
                    user: checkUser._id
                })
            });

            result = await Ticket.insertMany(buyTicket, { session });

            await Schedule.updateMany(
                { _id: findSchedule._id },
                { $set: { 'roomSeats.$[item].status': "pending" } },
                {
                    multi: true,
                    arrayFilters: [{ 'item.seatNo': { $in: seatNumber } }],
                    session
                }
            ).exec();

            await session.commitTransaction();
            session.endSession();

        } else if (checkUser.role === 'staff') {
            seatChosens.forEach(seat => {
                buyTicket.push({
                    _id: new mongoose.Types.ObjectId(),
                    schedule: findSchedule._id,
                    seat: seat,
                    user: checkUser._id,
                    status: 1,
                    paymentDate: Date.now()
                })
            });

            result = await Ticket.insertMany(buyTicket, { session });

            await Schedule.updateMany(
                { _id: findSchedule._id },
                { $set: { 'roomSeats.$[item].status': "sold" } },
                {
                    multi: true,
                    arrayFilters: [{ 'item.seatNo': { $in: seatNumber } }],
                    session
                }
            ).exec();

            await session.commitTransaction();
            session.endSession();
        }

        const checkTicket = await Ticket.findOne({
            seat: seatChosens.seatNo,
            schedule: findSchedule
        }).exec();

        if (checkTicket !== null) {
            await session.abortTransaction();
            session.endSession();
            return res.status(409).json({
                message: "Ticket already reserved"
            });
        }

        return res.status(201).json({
            message: "All ticket booked",
            data: result
        });

    } catch (error) {
        console.error(error.message);
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getTickets = async (req, res) => {
    try {
        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        const findTickets = await Ticket
            .find({
                user: checkUser._id
            })
            .populate({
                path: 'schedule',
                model: 'Schedule',
                populate: [{
                    path: 'movie',
                    model: 'Movie',
                    select: 'movieName'
                }, {
                    path: 'room',
                    model: 'Room',
                    select: 'roomName'
                }, {
                    path: 'slot',
                    model: 'Slot'
                }]
            })
            .populate('user', 'fullname phone')
            .exec();

        if (!findTickets) {
            return res.status(404).json({
                message: "Tickets not found",
            });
        }

        return res.status(200).json({
            message: "All tickets found",
            data: findTickets
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getTicket = async (req, res) => {
    try {
        const id = req.params.ticketId;

        const findTicket = await Ticket
            .findById(id)
            .populate({
                path: 'schedule',
                model: 'Schedule',
                populate: [{
                    path: 'movie',
                    model: 'Movie',
                    select: 'movieName'
                }, {
                    path: 'room',
                    model: 'Room',
                    select: 'roomName'
                }, {
                    path: 'slot',
                    model: 'Slot'
                }]
            })
            .populate('user', 'fullname phone')
            .exec();

        if (!findTicket) {
            return res.status(404).json({
                message: "Ticket not found"
            });
        }

        return res.status(200).json({
            message: "Ticket found",
            data: findTicket
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const updateTicketStatus = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        if (checkUser.role !== 'staff') {
            return res.status(403).json({
                message: "You don't have permission to access this"
            })
        }

        const id = req.params.ticketId;

        const findTicket = await Ticket
            .findById(id)
            .exec();

        if (!findTicket) {
            return res.status(404).json({
                message: "Ticket not found"
            });
        }

        const { status } = req.body;

        const updateTicket = await Ticket.updateOne(
            { _id: id },
            { status: status, paymentDate: Date.now() },
            { session }
        ).exec();

        await Schedule.updateOne(
            {
                _id: findTicket.schedule,
                'roomSeats.seatNo': findTicket.seat.seatNo
            },
            { $set: { 'roomSeats.$.status': "sold" } },
            { session }
        ).exec();

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            message: "Ticket status updated",
            data: updateTicket
        });
    } catch (error) {
        console.error(error);
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const deleteTicket = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        session.startTransaction();

        const { id } = req.body;

        console.log(id);

        if (!id) {
            return res.status(301).json({
                message: "Ticket id is not valid",
                data: null
            });
        }

        if (!Array.isArray(id)) {
            return res.status(409).json({
                message: "Ticket id is not an array",
                data: null
            });
        }

        const findTickets = await Ticket
            .find({ _id: { $in: id }, user: checkUser._id })
            .exec();

        if (!findTickets) {
            return res.status(404).json({
                message: "Tickets not found"
            });
        }

        //getting seats in tickets
        const seats = findTickets.map(x => x.seat)
        //getting seats number in seats
        const seatNumber = seats.map(x => x.seatNo)
        //getting schedules in tickets
        const scheduleId = findTickets.map(x => x.schedule)

        await Schedule.updateMany(
            {
                _id: { $in: scheduleId },
            },
            { $set: { 'roomSeats.$[item].status': "empty" } },
            {
                arrayFilters: [{ 'item.seatNo': { $in: seatNumber } }],
                session
            }
        ).exec();

        const deleteTicket = await Ticket
            .deleteMany({ _id: { $in: id } })
            .exec();

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            message: "Ticket deleted",
            data: deleteTicket
        });

    } catch (error) {
        console.error(error);
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

module.exports = {
    getMovieSchedule,
    getScheduleSeats,
    createTicket,
    getTickets,
    getTicket,
    updateTicketStatus,
    deleteTicket,
}