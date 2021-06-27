const mongoose = require('mongoose');
const Seat = require('../dbaccess/seat-model');
const SeatMap = require('../dbaccess/seat-map-model');

const addSeatMap = async (req, res) => {
    try {

        const seatMap = new SeatMap({
            _id: new mongoose.Types.ObjectId(),
            seats: [
                { seatNo: "A1", seatType: "normal", price: 60000, status: "empty" },
                { seatNo: "A2", seatType: "normal", price: 60000, status: "empty" },
                { seatNo: "A3", seatType: "normal", price: 60000, status: "empty" },
                { seatNo: "A4", seatType: "normal", price: 60000, status: "empty" },
            ]
        });

        seatMap.save(); 

        return res.status(201).json({
            message: "Ok, seat map added",
            data: seatMap
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getSeatMaps = async (req, res) => {
    try {
        const seatMap = await SeatMap
        .find()
        // .populate('seat')
        .exec();

        return res.status(200).json({
            message: "All seat maps found",
            data: seatMap
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getSeatMap = async (req, res) => {
    try {
        const id = req.params.seatId;

        const findMap = await SeatMap.findById(id).exec()

        return res.status(200).json({
            message: "Seat map found",
            data: findMap
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
    addSeatMap,
    getSeatMaps,
    getSeatMap
}