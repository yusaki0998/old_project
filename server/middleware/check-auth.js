const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
require('dotenv').config();

module.exports = async (req, res, next) => {

    if(!req.header('token')) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    
    try {
        const token = req.header('token');
        
        const payload = jwt.verify(token, process.env.REFRESH_SECRET,);

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