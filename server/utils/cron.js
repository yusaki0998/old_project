const mongoose = require('mongoose');
const cron = require('node-cron');
// require('../config/db');
const Ticket = require('../dbaccess/ticket-model');
const Schedule = require('../dbaccess/schedule-model');
require('../dbaccess/slot-model');
const moment = require('moment');

cron.schedule('* * * * *', () => {
    console.log("Running cron to check and delete tickets");
    deleteTicket();
});

const deleteTicket = async () => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const tickets = await Ticket
            .find({
                status: 0
            })
            .populate({
                path: 'schedule',
                model: 'Schedule',
                options: {
                    sort: { 'showDate': 1 }
                },
                populate: [{
                    path: 'slot',
                    model: 'Slot'
                }]
            })
            .exec();

        let ticketsToDelete = []
        tickets.forEach(ticket => {
            const ticketStartTime = ticket.schedule.slot.startTime;
            console.log(ticketStartTime);
            console.log("---------------------------------------------------");
            console.log(parseInt(moment().add(10, 'minutes').format('HHmm')));
            if (moment().isSame(moment(ticket.schedule.showDate), 'day')) {
                if (parseInt(moment().add(10, 'minutes').format('HHmm')) === ticketStartTime) {
                    ticketsToDelete.push(ticket._id);
                }
            }
        });

        //getting seats in tickets
        const seats = tickets.map(x => x.seat)
        //getting seats number in seats
        const seatNumber = seats.map(x => x.seatNo)
        //getting schedules in tickets
        const scheduleId = tickets.map(x => x.schedule)

        await Schedule.updateMany(
            {
                _id: { $in: scheduleId },
            },
            { $set: { 'roomSeats.$[item].status': "empty" } },
            {
                multi: true,
                arrayFilters: [{ 'item.seatNo': { $in: seatNumber } }],
                session
            }
        ).exec();

        console.log(ticketsToDelete);

        const check = await Ticket.deleteMany(
            { _id: { $in: ticketsToDelete } }, { session }
        ).exec();

        console.log(check);
    } catch (error) {
        console.error(error);
        await session.abortTransaction();
        session.endSession();
    }
}

