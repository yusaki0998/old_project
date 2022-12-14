const mongoose = require('mongoose');
const User = require('../dbaccess/user-model');
const SeatMap = require('../dbaccess/seat-map-model');
const Schedule = require('../dbaccess/schedule-model');

const addSeatMap = async (req, res) => {
    try {
        const { name } = req.body;
        const seatMap = new SeatMap({
            _id: new mongoose.Types.ObjectId(),
            name: name,
            seats: [

            ]
        });

        await seatMap.save();

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

        if (!seatMap || seatMap.length === 0) {
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

        const info = findMap.seats;
        const normal = info.find(element => element.seatType === 'normal');
        const vip = info.find(element => element.seatType === 'vip');

        return res.status(200).json({
            message: "Seat map found",
            data: {
                map: findMap,
                normalPrice: normal.price,
                vipPrice: vip.price
            }
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

const editSeatInMap = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        if (checkUser.role !== 'manager') {
            return res.status(403).json({
                message: "You don't have permission to access this"
            })
        }

        session.startTransaction();

        const mapId = req.params.mapId;

        const { type, price } = req.body;

        await SeatMap.updateMany(
            { _id: mapId, },
            { $set: { 'seats.$[item].price': price } },
            {
                multi: true,
                arrayFilters: [{ 'item.seatType': type }],
                session
            }
        ).exec();

        //update schedule seat map at the same time
        await Schedule.updateMany(
            { seatMap: mapId },
            { $set: { 'roomSeats.$[item].price': price } },
            {
                multi: true,
                arrayFilters: [{ 'item.seatType': type }],
                session
            }
        ).exec();

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            message: "All seats updated",
        });

    } catch (error) {
        console.error(error);
        await session.abortTransaction();
        session.endSession();
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
    getSeatInMap,
    editSeatInMap
}