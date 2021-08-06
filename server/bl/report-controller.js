const Report = require('../dbaccess/report-model');
const moment = require('moment');
//const _ = require('lodash');

const revenueReports = async (req, res) => {
    try {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const movieId = req.query.movie;
        const roomId = req.query.room;
        const slotId = req.query.slot;
        const userId = req.query.user;

        const sDate = moment(startDate, 'MM-DD-YYYY');
        const eDate = moment(endDate, 'MM-DD-YYYY');

        let query = [];
        if (!!startDate) {
            query.push({ paymentDate: { $gte: sDate } })
        }
        if (!!endDate) {
            query.push({ paymentDate: { $lte: eDate } })
        }
        if (!!movieId) {
            query.push({ movie: movieId })
        }
        if (!!roomId) {
            query.push({ room: roomId })
        }
        if (!!slotId) {
            query.push({ slot: slotId })
        }
        if (!!userId) {
            query.push({ user: userId })
        }

        let final_query = query.length ? { $and: query } : {};

        const report = await Report.find(
            final_query
        )
            .populate('movie', 'movieName')
            .populate('room', 'roomName')
            .populate('slot', 'slotName')
            .populate('user', 'fullname email')
            .exec()

        return res.status(200).json({
            message: "Report",
            data: report
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
    revenueReports,
}