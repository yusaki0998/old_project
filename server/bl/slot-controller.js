const mongoose = require('mongoose');
const Slot = require('../dbaccess/slot-model');
const User = require('../dbaccess/user-model');
const moment = require('moment');

const createSlot = async (req, res) => {
    try {
        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        if (checkUser.role !== 'manager') {
            return res.status(403).json({
                message: "You don't have permission to access this"
            })
        }

        const { slotName, startTime, endTime } = req.body;

        if (!slotName || !startTime || !endTime) {
            return res.status(301).json({
                message: "Missing required information for slot"
            });
        }

        const checkSlot = await Slot.find({
            slotName: slotName
        }).exec();

        if(checkSlot.length > 0) {
            return res.status(301).json({
                message: "Slot name already exist"
            });
        }

        if (startTime > 2359 || startTime < 0) {
            return res.status(301).json({
                message: "Start time must be with in 0h-23h59 range"
            });
        }

        if (endTime > 2359 || endTime < 0) {
            return res.status(301).json({
                message: "End time must be with in 0h-23h59 range"
            });
        }

        const slot = new Slot({
            _id: new mongoose.Types.ObjectId(),
            slotName: slotName,
            startTime: startTime,
            endTime: endTime
        });

        await slot.save();

        return res.status(200).json({
            message: "Slot created",
            data: slot
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getSlots = async (req, res) => {
    try {
        const findSlots = await Slot.find().exec();

        return res.status(200).json({
            message: "Slots found",
            data: findSlots
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getSlot = async (req, res) => {
    try {
        const id = req.params.slotId;

        const findSlot = await Slot.findById(id).exec();

        return res.status(200).json({
            message: "Slot found",
            data: findSlot
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const updateSlot = async (req, res) => {
    try {
        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        if (checkUser.role !== 'manager') {
            return res.status(403).json({
                message: "You don't have permission to access this"
            })
        }

        const id = req.params.slotId;

        const slot = await Slot.findById(id).exec();

        if (!slot) {
            return res.status(404).json({
                message: "Slot not found"
            });
        }

        const { slotName, startTime, endTime } = req.body;

        if (slotName) {
            slot.slotName = slotName;
        }

        if (startTime) {
            if (startTime > 2359 || startTime < 0) {
                return res.status(301).json({
                    message: "Start time must be with in 0h-23h59 range"
                });
            } else {
                slot.startTime = startTime;
            }
        }

        if (endTime) {
            if (endTime > 2359 || endTime < 0) {
                return res.status(301).json({
                    message: "End time must be with in 0h-23h59 range"
                });
            } else {
                slot.endTime = endTime;
            }
        }

        await slot.save();

        return res.status(200).json({
            message: "Slot updated",
            data: slot
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const deleteSlot = async (req, res) => {
    try {
        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        if (checkUser.role !== 'manager') {
            return res.status(403).json({
                message: "You don't have permission to access this"
            })
        }

        const id = req.params.slotId;

        const deleteSlot = await Slot.findByIdAndDelete(id).exec();

        if(!deleteSlot) {
            return res.status(404).json({
                message: "Id not found cannot delete slot"
            });
        }

        return res.status(200).json({
            message: "Slot deleted",
            data: deleteSlot
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
    createSlot,
    getSlots,
    getSlot,
    updateSlot,
    deleteSlot
}
