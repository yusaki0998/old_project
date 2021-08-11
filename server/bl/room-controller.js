const mongoose = require('mongoose');
const Room = require('../dbaccess/room-model');
const User = require('../dbaccess/user-model');
const Schedule = require('../dbaccess/schedule-model');

const createRoom = async (req, res) => {
    try {
        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        if (checkUser.role !== 'manager') {
            return res.status(403).json({
                message: "You don't have permission to access this"
            })
        }

        const { roomName, seatMap } = req.body;

        if (!roomName) {
            return res.status(301).json({
                message: "Missing information required to create room"
            });
        }

        const findRooms = await Room.findOne({
            roomName: roomName
        });

        if(findRooms) {
            return res.status(409).json({
                message: "Already have a room with this name"
            });
        }

        const room = new Room({
            _id: new mongoose.Types.ObjectId(),
            roomName: roomName,
            seatMap: seatMap
        });

        await room.save();

        return res.status(201).json({
            message: "Room created",
            data: room
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getRooms = async (req, res) => {
    try {
        const findRooms = await Room
        .find()
        .populate('seatMap', 'name image')
        .exec();

        if(!findRooms || findRooms.length === 0) {
            return res.status(404).json({
                message: "Rooms not found"
            });
        }

        return res.status(200).json({
            message: "Rooms found",
            data: findRooms
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getRoom = async (req, res) => {
    try {
        const id = req.params.roomId;

        const findRoom = await Room
        .findById(id)
        .populate('seatMap')
        .exec();

        if(!findRoom) {
            return res.status(404).json({
                message: "Room not found"
            });
        }

        return res.status(200).json({
            message: "Room infomation found",
            data: findRoom
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const updateRoom = async (req, res) => {
    try {
        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        if (checkUser.role !== 'manager') {
            return res.status(403).json({
                message: "You don't have permission to access this"
            })
        }

        const { roomName, seatMap } = req.body;

        const id = req.params.roomId;

        const room = await Room.findOne({
            _id: id
        }).exec();

        if(!room){
            return res.status(404).json({
                message: "Room not found"
            });
        }

        const findRooms = await Room.findOne({
            roomName: roomName
        });

        if(findRooms) {
            return res.status(409).json({
                message: "Already have a room with this name"
            });
        }

        if(roomName) {
            room.roomName = roomName;
        }

        if(seatMap) {
            room.seatMap = seatMap;
        }

        await room.save();

        return res.status(200).json({
            message: "Room updated",
            data: room
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const deleteRoom = async (req, res) => {
    try {
        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        if (checkUser.role !== 'manager') {
            return res.status(403).json({
                message: "You don't have permission to access this"
            })
        }

        const id = req.params.roomId;
        
        const checkRoomSchedule = await Schedule.find({
            room: id
        }).exec();

        if(checkRoomSchedule.length !== 0) {
            return res.status(409).json({
                message: "Cannot delete room ! You must delete all schedule with this room"
            });
        }

        const deleteRoom = await Room.findByIdAndDelete(id).exec();

        if(!deleteRoom){
            return res.status(404).json({
                message: "Id not found cannot delete room"
            });
        }

        return res.status(200).json({
            message: "Room deleted",
            data: deleteRoom
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
    createRoom,
    getRooms,
    getRoom,
    updateRoom,
    deleteRoom
}