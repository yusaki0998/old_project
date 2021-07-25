require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../dbaccess/user-model');

module.exports = async (req, res, next) => {
    const token = req.header('token');

    if(!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {
        const payload = jwt.verify(token, process.env.REFRESH_SECRET);

        const user = await User
        .findById(payload._id)
        .exec();

        if(!user) {
            return res.status(404).json({
                message: "User does not exist"
            });
        }

        req.userData = user;
        next();

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Auth fail"
        });
    }
}