const mongoose = require('mongoose');
const Seat = require('../dbaccess/seat-model');
const SeatMap = require('../dbaccess/seat-map-model');

const addSeatMap = async (req, res) => {
    try {
        const { name } = req.body;
        const seatMap = new SeatMap({
            _id: new mongoose.Types.ObjectId(),
            name: name,
            seats: [
                
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

        if (!seatMap) {
            return res.status(404).json({
                message: "Seat maps not found"
            });
        }

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
        const id = req.params.mapId;

        const findMap = await SeatMap.findById(id).exec()

        if (!findMap) {
            return res.status(404).json({
                message: "Map not found"
            });
        }

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

const getSeatInMap = async (req, res) => {
    try {
        const seatId = req.params.seatId;
        const mapId = req.params.mapId;

        const findSeatMap = await SeatMap
            .findOne({ _id: mapId, })
            .select({ seats: { $elemMatch: { _id: seatId } } })
            .exec();

        if (!findSeatMap) {
            return res.status(404).json({
                message: "Map or seat in map not exist"
            });
        }

        return res.status(200).json({
            message: "Seat found",
            data: findSeatMap
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
    getSeatMap,
    getSeatInMap
}