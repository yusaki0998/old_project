const Ticket = require('../dbaccess/ticket-model');
const Schedule = require('../dbaccess/schedule-model');
const User = require('../dbaccess/user-model');
const Movie = require('../dbaccess/movie-model');
const moment = require('moment');
const _ = require('lodash');

const movieReports = async (req, res) => {
    try {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const movieId = req.query.movie;

        const sDate = moment(startDate, 'MM-DD-YYYY');
        const eDate = moment(endDate, 'MM-DD-YYYY');

        let query = [];
        if (!!startDate) {
            query.push({ showDate: { $gte: sDate } })
        }
        if (!!endDate) {
            query.push({ showDate: { $lte: eDate } })
        }
        if (!!movieId) {
            query.push({ movie: movieId })
        }

        let final_query = query.length ? { $and: query } : {};

        const findSchedule = await Schedule.find(
            final_query
        )
            .populate('movie', 'movieName')
            .exec()

        let movieSchedule = [];
        findSchedule.forEach(schedule => {
            movieSchedule.push(schedule.movie)
        });

        const unique = _.uniqWith(movieSchedule, _.isEqual);
        const result = _.compact(unique);

        let id = findSchedule.map(schedule => { return schedule._id });
        const findTicket = await Ticket.find(
            {
                schedule: { $in: id },
                status: 1
            }
        )
            .populate({
                path: 'schedule',
                model: 'Schedule',
                //match: { showDate: { $gte: sDate, $lte: eDate } },
                populate: [{
                    path: 'movie',
                    model: 'Movie',
                    select: 'movieName',
                    match: { _id: findSchedule.movie }
                }]
            })
            .exec();

        let normalSeats = [];
        let vipSeats = [];
        findTicket.forEach(ticket => {
            if (ticket.seat.seatType === 'normal') {
                normalSeats.push(ticket);
            } else if (ticket.seat.seatType === 'vip') {
                vipSeats.push(ticket);
            }
        });

        return res.status(200).json({
            message: "Report",
            data: {
                movie: result,
                scheduleReport: findSchedule.length,
                ticketReport: findTicket.length,
                normalSeatReport: normalSeats.length,
                vipSeatReport: vipSeats.length,
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

const staffReports = async (req, res) => {
    try {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;

        const sDate = moment(startDate, 'MM-DD-YYYY');
        const eDate = moment(endDate, 'MM-DD-YYYY');

        const staffId = req.params.staffId;

        const getStaff = await User.findOne({
            _id: staffId,
            role: 'staff'
        }).exec();

        const findSchedule = await Schedule.find({
            showDate: {
                $gte: sDate,
                $lte: eDate
            }
        }).exec();

        //let userId = getStaff.map(staff => { return staff._id });
        let scheduleId = findSchedule.map(schedule => { return schedule._id });
        const findTicket = await Ticket.find(
            {
                user: staffId,
                schedule: { $in: scheduleId },
                status: 1
            }
        )
            .populate({
                path: 'schedule',
                model: 'Schedule',
                options: {
                    sort: { 'showDate': -1 }
                },
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
            .exec();

        let normalSeats = [];
        let vipSeats = [];
        findTicket.forEach(ticket => {
            if (ticket.seat.seatType === 'normal') {
                normalSeats.push(ticket);
            } else if (ticket.seat.seatType === 'vip') {
                vipSeats.push(ticket);
            }
        });

        return res.status(200).json({
            message: "Report",
            data: {
                staffInfo: getStaff,
                ticketReport: findTicket.length,
                normalSeatReport: normalSeats.length,
                vipSeatReport: vipSeats.length,
                ticketHistory: findTicket
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

module.exports = {
    movieReports,
    staffReports
}