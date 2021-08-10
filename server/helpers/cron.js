const mongoose = require('mongoose');
const cron = require('node-cron');
const Ticket = require('../dbaccess/ticket-model');
const Schedule = require('../dbaccess/schedule-model');
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

//get current date time
let now = moment();

console.log(now);

let hour = now.hour();
console.log(hour);
let min = now.minute();
console.log(min);

let currentTime = `${hour}` + `${min}`;
console.log(currentTime);

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

    

        console.log(tickets);
}

console.log(deleteTicket());

