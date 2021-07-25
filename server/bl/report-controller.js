const Ticket = require('../dbaccess/ticket-model');
const Schedule = require('../dbaccess/schedule-model');
const User = require('../dbaccess//user-model');

const movieReports = async (req, res) => {
    try {
        const weekNumber = req.query.week;

        const countSchedule = await Schedule.find(
            { week: weekNumber }
        )
            .populate('movie', 'movieName')
            .exec();

        //Get schedule id for tickets query
        let id = countSchedule.map(schedule => { return schedule._id });
        const countTicket = await Ticket.find(
            {
                schedule: { $in: id },
                //status: 1
            }
        )
            .populate({
                path: 'schedule',
                model: 'Schedule',
                match: { week: weekNumber },
                populate: [{
                    path: 'movie',
                    model: 'Movie',
                    select: 'movieName',
                    match: { _id: countSchedule.movie }
                }]
            })
            .exec();

        let normalSeats = [];
        let vipSeats = [];
        countTicket.forEach(ticket => {
            if (ticket.seat.seatType === 'normal') {
                normalSeats.push(ticket);
            } else if (ticket.seat.seatType === 'vip') {
                vipSeats.push(ticket);
            }
        });

        return res.status(200).json({
            message: "Movie report",
            data: {
                movieSchedule: countSchedule,
                scheduleReport: countSchedule.length,
                ticket: countTicket,
                ticketReport: countTicket.length,
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
        const weekNumber = req.query.week;

        const getStaffs = await User.find({
            role: 'staff'
        }).exec();

        const countSchedule = await Schedule.find(
            { week: weekNumber }
        ).exec();

        //Get staff id for tickets query
        let userId = getStaffs.map(staff => { return staff._id });
        let scheduleId = countSchedule.map(schedule => { return schedule._id });
        const countTicket = await Ticket.find(
            {
                user: { $in: userId },
                schedule: { $in: scheduleId },
                //status: 1
            }
        )
            .populate({
                path: 'schedule',
                model: 'Schedule',
                match: { week: weekNumber },
            })
            .populate({
                path: 'user',
                model: 'User',
                select: 'fullname email',
                match: { _id: getStaffs._id }
            })
            .exec();

        return res.status(200).json({
            message: "Report",
            data: {
                staffTicketReport: countTicket,
                report: countTicket.length
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