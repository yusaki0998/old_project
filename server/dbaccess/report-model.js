const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

});

module.exports = mongoose.model('Report', reportSchema);