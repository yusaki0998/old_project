const mongoose = require('mongoose');
const moment = require('moment');
const Schedule = require('../dbaccess/schedule-model');
const Movie = require('../dbaccess/schedule-model');
const Room = require('../dbaccess/room-model');
const Slot = require('../dbaccess/slot-model');
const User = require('../dbaccess/user-model');

const createSchedule = async (req, res) => {
    try {
        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        if (checkUser.role !== 'manager') {
            return res.status(403).json({
                message: "You don't have permission to access this"
            })
        }

        const { movieId, roomId, slotId, showDate } = req.body;

        // const findMovie = await Movie.findById(movieId).exec();

        // const findRoom = await Room.findById(roomId).exec();

        // const findSlot = await Slot.findById(slotId).exec();

        if(!movieId || !roomId || !slotId){
            return res.status(404).json({
                message: "Missing information required to create schedule"
            });
        }

        if (!moment(showDate).isValid()) {
            return res.status(301).json({
                message: "Show date is in invalid format"
            });
        }

        const weekNumber = moment(showDate, "MMDDYYYY").isoWeek();

        const schedule = new Schedule({
            _id: new mongoose.Types.ObjectId(),
            movie: movieId, //findMovie._id,
            room: roomId, //findRoom._id,
            slot: slotId, //findSlot._id,
            showDate: showDate,
            week: weekNumber,
        });

        await schedule.save();

        const findSchedule = await Schedule
        .findById(schedule._id)
        .populate('movie', 'movieName')
        .populate('room', 'roomName')
        .populate('slot')
        .exec();

        return res.status(201).json({
            message: "Schedule created",
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

const getSchedules = async (req, res) => {
    try {
        const findSchedules = await Schedule
        .find()
        .populate('movie', 'movieName')
        .populate('room', 'roomName')
        .populate('slot')
        .exec();

        if(!findSchedules) {
            return res.status(404).json({
                message: "Schedules not found"
            });
        }

        return res.status(200).json({
            message: "Schedules found",
            data: findSchedules
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getSchedule = async (req, res) => {
    try {
        const id = req.params.scheduleId;

        const findSchedule = await Schedule
        .findById(id)
        .populate('movie', 'movieName')
        .populate('room', 'roomName')
        .populate('slot')
        .exec();

        if(!findSchedule) {
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

const editSchedule = async (req, res) => {
    try {
        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        if (checkUser.role !== 'manager') {
            return res.status(403).json({
                message: "You don't have permission to access this"
            })
        }

        const id = req.params.scheduleId;

        const { movieId } = req.body

        const schedule = await Schedule
        .findById(id)
        .exec();

        if(!schedule) {
            return res.status(404).json({
                message: "Schedule not found"
            });
        }

        if(movieId) {
            schedule.movie = movieId
        }

        await schedule.save();

        const updatedSchedule = await Schedule
        .findById(id)
        .populate('movie', 'movieName')
        .populate('room', 'roomName')
        .populate('slot')
        .exec();

        return res.status(200).json({
            message: "Schedule updated",
            data: updatedSchedule
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const deleteSchedule = async (req, res) => {
    try {
        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        if (checkUser.role !== 'manager') {
            return res.status(403).json({
                message: "You don't have permission to access this"
            })
        }

        const id = req.params.scheduleId;

        const deleteSchedule = await Schedule.findByIdAndDelete(id).exec();

        if(!deleteSchedule){
            return res.status(404).json({
                message: "Id not found cannot delete schedule"
            });
        }

        return res.status(200).json({
            message: "Schedule deleted",
            data: deleteSchedule
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
    createSchedule,
    getSchedules,
    getSchedule,
    editSchedule,
    deleteSchedule
}
