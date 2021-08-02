//const mongoose = require('mongoose');
const cron = require('node-cron');
const Ticket = require('../dbaccess/ticket-model');
const Schedule = require('../dbaccess/schedule-model');
const moment = require('moment');

// cron.schedule('* * * * *', function() {

// });

//get current date time
let now = moment();

console.log(now);

let hour = now.hour();
console.log(hour);
let min = now.minute();
console.log(min);
//const findSchedule = Schedule.find().exec();

const deleteTicket = async () => {
    const schedule = await Schedule
    .find()
    .populate('slot')
    .exec();
}

