const mongoose = require('mongoose');
const User = require('../dbaccess/user-model');
const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { fullname, gender, email, phone, password, retype, dob } = req.body;

        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!email || !password || !fullname || !dob || !phone) {
            return res.status(301).json({
                message: "Missing information required to register"
            });
        }

        if (!regexp.test(email)) {
            return res.status(301).json({
                message: "Email is in invalid format"
            });
        }

        if (phone.length < 10) {
            return res.status(301).json({
                message: "Your phone number is invalid, phone number must be 10 numbers"
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
            gender: gender,
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

        if (!regexp.test(email)) {
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
            expiresIn: "3d"
        });

        const userObj = user.toObject();
        delete userObj.password;
        delete userObj.__v;

        return res.status(200).json({
            message: "Login success!",
            data: {
                accessToken: accessToken,
                refreshToken: refreshToken,
                user: userObj
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

        if (!user) {
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

const updateProfile = async (req, res) => {
    try {
        const id = req.userData._id;

        const { fullname, gender, email, phone } = req.body;

        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const user = await User.findOne({
            _id: id
        }).exec()

        if (req.file) {
            user.avatar = req.file.originalname;
        }

        if (fullname) {
            user.fullname = fullname;
        }

        if (email) {
            if (!regexp.test(email)) {
                return res.status(301).json({
                    message: "Email is in invalid format"
                });
            } else {
                user.email = email;
            }
        }

        if (phone) {
            if (phone.length < 10) {
                return res.status(301).json({
                    message: "Your phone number is invalid, phone number must be 10 numbers"
                });
            } else {
                user.phone = phone;
            }
        }

        if (gender) {
            user.gender = gender;
        }

        await user.save();

        return res.status(200).json({
            message: "User profile updated",
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

const changePassword = async (req, res) => {
    try {
        const id = req.userData._id;

        const { oldpassword, newpassword, retype } = req.body;

        const user = await User.findOne({
            _id: id
        })
        .select('+password')
        .exec();

        if (oldpassword) {
            let validPassword = await bcrypt.compare(oldpassword, user.password);

            if (validPassword && newpassword === retype) {
                const hashedPassword = await bcrypt.hash(newpassword, 10);
                user.password = hashedPassword
            }
            else {
                return res.status(301).json({
                    message: "Retype password does not match"
                });
            }
        }

        await user.save();

        return res.status(200).json({
            message: "User password updated",
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

const addAccount = async (req, res) => {
    try {
        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        if (checkUser.role !== 'admin') {
            return res.status(403).json({
                message: "You don't have permission to access this"
            })
        }

        const { fullname, gender, email, phone, password, retype, dob, role } = req.body;

        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!email || !password || !fullname || !dob || !phone) {
            return res.status(301).json({
                message: "Missing information required to register"
            });
        }

        if (!regexp.test(email)) {
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
            gender: gender,
            email: email,
            phone: phone,
            password: hashedPassword,
            dob: dob,
            role: role
        });

        await user.save();

        return res.status(201).json({
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

const getStaffs = async (req, res) => {
    try {
        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        if (checkUser.role !== 'admin') {
            return res.status(403).json({
                message: "You don't have permission to access this"
            })
        }

        const findStaffs = await User.find({
            role: 'staff'
        }).exec();

        return res.status(200).json({
            message: "All staffs found",
            data: findStaffs
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getStaff = async (req, res) => {
    try {
        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        if (checkUser.role !== 'admin') {
            return res.status(403).json({
                message: "You don't have permission to access this"
            })
        }

        const id = req.params.staffId;

        const findStaff = await User.findOne({
            _id: id,
            role: 'staff'
        }).exec();

        return res.status(200).json({
            message: "Staff information found",
            data: findStaff
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getManagers = async (req, res) => {
    try {
        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        if (checkUser.role !== 'admin') {
            return res.status(403).json({
                message: "You don't have permission to access this"
            })
        }

        const findManagers = await User.find({
            role: 'manager'
        }).exec();

        return res.status(200).json({
            message: "All managers found",
            data: findManagers
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getManager = async (req, res) => {
    try {
        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        if (checkUser.role !== 'admin') {
            return res.status(403).json({
                message: "You don't have permission to access this"
            })
        }

        const id = req.params.managerId;

        const findManager = await User.findOne({
            _id: id,
            role: 'manager'
        }).exec();

        return res.status(200).json({
            message: "Manager information found",
            data: findManager
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const deleteAccount = async (req, res) => {
    try {
        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        if (checkUser.role !== 'admin') {
            return res.status(403).json({
                message: "You don't have permission to access this"
            })
        }

        const id = req.params.accountId;

        const deleteAccount = await User.findByIdAndRemove(id).exec();

        if(!deleteAccount) {
            return res.status(404).json({
                message: "Id not found cannot delete account"
            });
        }

        return res.status(200).json({
            message: "Account deleted",
            data: deleteAccount
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const editAccount = async (req, res) => {
    try {
        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        if (checkUser.role !== 'admin') {
            return res.status(403).json({
                message: "You don't have permission to access this"
            })
        }

        const id = req.params.accountId;

        const { fullname, gender, email, dob, phone, password, role } = req.body;

        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const user = await User.findOne({
            _id: id
        })
        .select('+password')
        .exec()

        if (fullname) {
            user.fullname = fullname;
        }

        if (email) {
            if (!regexp.test(email)) {
                return res.status(301).json({
                    message: "Email is in invalid format"
                });
            } else {
                user.email = email;
            }
        }

        if (dob) {
            if (!moment(dob).isValid()) {
                return res.status(301).json({
                    message: "Date of birth is in invalid format"
                });
            } else {
                user.dob = dob;
            }
        }

        if (phone) {
            if (phone.length < 10) {
                return res.status(301).json({
                    message: "Your phone number is invalid, phone number must be 10 numbers"
                });
            } else {
                user.phone = phone;
            }
        }

        if (gender) {
            user.gender = gender;
        }

        if (role) {
            user.role = role;
        }

        if (password) {
            let validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                return res.status(301).json({
                    message: "Password invalid"
                });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                user.password = hashedPassword
            }
        }

        await user.save();

        return res.status(200).json({
            message: "Account updated",
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

const search = async (req, res) => {
    try {
        const input = req.query.input;

        const findUsers = await User.find({
            $and: [
                {
                    $or: [
                        { fullname: new RegExp(input, 'i') }
                    ]
                },
                {
                    _id: { $ne: req.userData._id.toString() }
                }
            ]
        }).limit(10).exec();

        if (!findUsers || findUsers.length === 0) {
            return res.json([]);
        }

        return res.status(200).json({
            message: "Users found",
            data: findUsers
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
    profile,
    updateProfile,
    changePassword,
    addAccount,
    getStaffs,
    getStaff,
    getManagers,
    getManager,
    deleteAccount,
    editAccount,
    search
}