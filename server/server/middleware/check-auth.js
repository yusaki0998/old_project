const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
require('dotenv').config();

module.exports = async (req, res, next) => {
    const token = req.header('token');

    if(!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const payload = jwt.verify(token, process.env.REFRESH_SECRET);

    try {
        const user = await User
        .findById(payload._id)
        .exec();

        if(!user) {
            return res.status(401).json({
                message: "User not exist"
            });
        }

        req.userData = user;
        req.userToken = token;
        next();

    } catch (error) {
        console.log(error.message)
        return res.status(401).json({
            message: "Auth fail"
        });
    }
}