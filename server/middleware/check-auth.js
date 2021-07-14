require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../dbaccess/user-model');

module.exports = async (req, res, next) => {

    if(!req.header('token')) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    
    try {
        const token = req.header('token');
        
        const payload = jwt.verify(token, 'huytqse06084',);

        const user = await User
        .findById(payload._id)
        .exec();

        if(!user) {
            return res.status(404).json({
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