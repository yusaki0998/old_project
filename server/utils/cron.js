//const mongoose = require('mongoose');
const cron = require('node-cron');
const Ticket = require('../dbaccess/ticket-model');
require('../dbaccess/schedule-model');
require('../dbaccess/slot-model');
const moment = require('moment');

// const uri =
//     "mongodb+srv://huytq:09001210@capstonecluster.e4xd9.mongodb.net/ot-bm?retryWrites=true&w=majority";

// mongoose
//     .connect(uri, {
//         useCreateIndex: true,
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//     })
//     .then(() => {
//         console.log("OK!");
//     })
//     .catch((err) => {
//         console.log(err);
//     });

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
        if (moment().isSame(moment(ticket.schedule.showDate), 'day')) {
            if (parseInt(moment().format('HHmm')) - ticket.schedule.slot.startTime === 30) {
                ticketsToDelete.push(ticket._id);
            }
        }
    });

    await Ticket.deleteMany(
        { _id: { $in: ticketsToDelete } }
    ).exec();
}

