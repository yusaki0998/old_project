const mongoose = require('mongoose');

//let urlHost = `${process.env.PROTOCOL}://${process.env.HOST_NAME}:${process.env.PORT}`;

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    fullname: { type: String, required: true },

    gender: { type: String, enum: ['male', 'female', 'other'], default: 'other' },

    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },

    phone: { type: String, required: true, unique: true, limit: 10 },

    password: { type: String, required: true, select: false },

    dob: { type: Date, required: true },

    avatar: { type: String, default: `../uploads/sample.png` /*`${urlHost}/uploads/sample.png`*/ },

    //0:admin, 1:manager, 2:staff, 3:customer
    //access enum values user.schema.path('values').enumValues
    role: {
        type: String,
        enum: ['admin', 'manager', 'staff', 'customer'],
        default: 'customer'
    },

    verified: { type: Boolean, default: false },

    verifyToken: { type: String, default: null },
});

userSchema.index({
    fullname: 'text',
    phone: 'text',
    email: 'text'
});

module.exports = mongoose.model('User', userSchema);