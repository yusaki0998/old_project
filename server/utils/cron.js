//const mongoose = require('mongoose');
const cron = require('node-cron');
const Ticket = require('../dbaccess/ticket-model');
const Schedule = require('../dbaccess/schedule-model');
require('../dbaccess/slot-model');
const moment = require('moment');
const Slot = require('../dbaccess/slot-model');

const uri =
    "mongodb+srv://huytq:09001210@capstonecluster.e4xd9.mongodb.net/ot-bm?retryWrites=true&w=majority";

mongoose
    .connect(uri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("OK!");
    })
    .catch((err) => {
        console.log(err);
    });

// cron.schedule('* * * * *', function() {

// });

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

    ticketsToDelete = []
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
    })

    const check = await Ticket.deleteMany(
        { _id: { $in: ticketsToDelete } },
    ).exec();

    console.log(check);

}

console.log(deleteTicket());

