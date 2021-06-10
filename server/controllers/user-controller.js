const mongoose = require('mongoose');
const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { fullname, email, phone, password, retype, dob } = req.body;

        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!email || !password || !fullname || !dob || !phone) {
            return res.status(301).json({
                message: "Missing information required to register"
            });
        }

        if(!regexp.test(email)){
            return res.status(301).json({
                message: "Email is in invalid format"
            });
        }

        if (phone.length < 10) {
            return res.status(301).json({
                message: "Your phone number is invalid"
            });
        }

        if (!moment(dob).isValid()) {
            return res.status(301).json({
                message: "Date of birth is in invalid format"
            });
        }

        if (password !== retype) {
            return res.status(301).json({
                message: "Your password is not match"
            });
        }

        const findUser = await User.findOne({
            email: email
        });

        if (findUser) {
            return res.status(409).json({
                message: "Email existed"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            fullname: fullname,
            email: email,
            phone: phone,
            password: hashedPassword,
            dob: dob,
        });

        await user.save();

        return res.status(200).json({
            message: "Account created",
            data: user
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!regexp.test(email)){
            return res.status(401).json({
                message: "Email is invalid",
                data: null
            });
        }

        const user = await User.findOne({
            email: email
        })
            .select('+password')
            .exec();

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({
                message: "Password does not match",
                data: null
            });
        }

        const accessToken = jwt.sign({
            _id: user._id,
        },
            process.env.ACCESS_SECRET, {
            expiresIn: "30s"
        });

        const refreshToken = jwt.sign({
            _id: user._id,
        },
            process.env.REFRESH_SECRET, {
            expiresIn: "8h"
        });

        return res.status(200).json({
            message: "Login success!",
            data: {
                accessToken: accessToken,
                refreshToken: refreshToken,
                user: user
            }
        });
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const profile = async (req, res) => {
    try {
        const id = req.userData._id;
        const user = await User
        .findById(id)
        .exec();

        if(!user){
            return res.status(401).json({
                message: "Failed to retrieve user info"
            });
        }

        return res.status(200).json({
            message: "Retrieved user info",
            data: user
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}



module.exports = {
    register,
    login,
    profile
}