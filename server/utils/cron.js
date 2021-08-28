//const mongoose = require('mongoose');
const cron = require('node-cron');
const Ticket = require('../dbaccess/ticket-model');
const Schedule = require('../dbaccess/schedule-model');
require('../dbaccess/slot-model');
const moment = require('moment');

cron.schedule('* * * * *', () => {
    console.log("Running cron to check and delete tickets");
    deleteTicket();
});

const deleteTicket = async () => {
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
                Schedule.updateOne(
                    {
                        _id: ticket.schedule,
                        'roomSeats.seatNo': ticket.seat.seatNo
                    },
                    { $set: { 'roomSeats.$.status': "empty" } },
                ).exec();
                ticketsToDelete.push(ticket._id);
            }
        }
    });

    console.log(ticketsToDelete);

    const check = await Ticket.deleteMany(
        { _id: { $in: ticketsToDelete } },
    ).exec();

    console.log(check);

}

