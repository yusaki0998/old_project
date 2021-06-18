const mongoose = require('mongoose');
const Room = require('../models/room-model');
const User = require('../models/user-model');

const createRoom = async (req, res) => {
    try {
        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        if (checkUser.role !== 'manager') {
            return res.status(403).json({
                message: "You don't have permission to access this"
            })
        }

        const { roomName } = req.body;

        if (!roomName) {
            return res.status(301).json({
                message: "Missing information required to create room"
            });
        }

        const room = new Room({
            _id: new mongoose.Types.ObjectId(),
            roomName: roomName
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
        const findRooms = await Room.find().exec();

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

        const findRoom = await Room.findOne({
            _id: id
        }).exec();

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

        const { roomName } = req.body;

        const id = req.params.roomId;

        const room = await Room.findOne({
            _id: id
        }).exec();

        if(!room){
            return res.status(404).json({
                message: "Room not found"
            });
        }

        if(roomName) {
            room.roomName = roomName;
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
        console.error(error.message);
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