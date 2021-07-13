const mongoose = require('mongoose');
const Ticket = require('../dbaccess/ticket-model');
const Schedule = require('../dbaccess/schedule-model');
const User = require('../dbaccess/user-model');

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

        if (seatChosens.length > 8) {
            return res.status(301).json({
                message: "You cannot choose more than 8 seats"
            });
        }

        const findSchedule = await Schedule.findById(id).exec();

        let buyTicket = [];
        seatChosens.forEach(seat => {
            buyTicket.push({
                _id: new mongoose.Types.ObjectId(),
                schedule: findSchedule._id,
                seat: seat,
                user: checkUser._id
            })
        });

        const data = await Ticket.insertMany(buyTicket, { session });

        const seatNumber = seatChosens.map(seat => seat.seatNo);

        //update seats status in current schedule
        const data0 = await Schedule.updateMany(
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

        return res.status(201).json({
            message: "All ticket booked",
            data: data
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
                message: "All tickets not found",
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
    try {
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

        const updateTicket = await Ticket.findByIdAndUpdate(id, { status: status }).exec();

        return res.status(200).json({
            message: "Ticket status updated",
            data: updateTicket
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const deleteTicket = async (req, res) => {
    try {
        const id = req.params.ticketId;

        const findTicket = await Ticket
            .findById(id)
            .exec();

        if (!findTicket) {
            return res.status(404).json({
                message: "Ticket not found"
            });
        }

        const deleteTicket = await Ticket.findByIdAndDelete(id).exec();

        return res.status(200).json({
            message: "Ticket deleted",
            data: deleteTicket
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
    createTicket,
    getTickets,
    getTicket,
    updateTicketStatus,
    deleteTicket
}