const mongoose = require('mongoose');
const User = require('../dbaccess/user-model');
const Ticket = require('../dbaccess/ticket-model');
const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require("dotenv").config();
const generateString = require('../utils/randomString');
const cloudinary = require('../utils/cloudinary');

const transporter = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PW,
    }
});

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

        const checkEmail = await User.find({ email: email }).exec();

        if (checkEmail.length > 0) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        if (phone.length > 10) {
            return res.status(301).json({
                message: "Your phone number is invalid, phone number must be 10 numbers"
            });
        }

        const checkPhone = await User.find({ phone: phone }).exec();

        if (checkPhone.length > 0) {
            return res.status(409).json({
                message: "Phone already registered"
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

        let url;
        if (process.env.NODE_ENV === 'production') {
            url = `${process.env.PROTOCOL}s://${process.env.DEPLOY_NAME}/api/v1/users/verify/${user._id}`
        }
        else {
            url = `${process.env.PROTOCOL}://${process.env.LOCAL_NAME}:${process.env.PORT}/api/v1/users/verify/${user._id}`;
        }

        transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'Welcome to OT-BM cinema, please verify your account',
            html: `Click <a href = '${url}'>here</a> to confirm your email.`
        });

        return res.status(201).json({
            message: `Verification mail sent to ${email}`,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const verify = async (req, res) => {
    try {
        const userId = req.params.id;

        console.log(userId);

        if (!userId) {
            return res.status(404).json({
                message: "Cannot find registered user"
            });
        }

        const user = await User.findOne({
            _id: userId
        }).exec();

        if (!user) {
            return res.status(404).json({
                message: "User does not exist"
            });
        }

        user.verified = true;

        await user.save();

        return res.status(200).json({
            message: "Account verified"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const userMail = await User.findOne({
            email: email,
            verified: true
        }).exec();

        if (!userMail) {
            return res.status(404).json({
                message: "Email not found"
            });
        }

        const randomString = generateString(8);

        const hashString = await bcrypt.hash(randomString, 10);

        userMail.password = hashString;

        await userMail.save();

        transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'Password reset',
            html: `Your new password is ${randomString}. Besure to change it immediately after you login`
        });

        return res.status(200).json({
            message: "Reset password success, an email with a new password just sent to you"
        });

    } catch (error) {
        console.error(error);
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
            return res.status(301).json({
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
            return res.status(404).json({
                message: "User not found"
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(301).json({
                message: "Password does not match",
                data: null
            });
        }

        //Verify ok thi gỡ cái này ra
        // if (!user.verified) {
        //     return res.status(403).json({
        //         message: "Please verify your email first before login"
        //     });
        // }

        const token = jwt.sign({
            _id: user._id,
        },
            process.env.REFRESH_SECRET, {
            expiresIn: "8h"
        });

        const userObj = user.toObject();
        delete userObj.password;

        return res.status(200).json({
            message: "Login success!",
            data: {
                token: token,
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
        return res.status(200).json({
            message: "Retrieved user info",
            data: req.userData
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

        let cloud;
        if (req.file) {
            cloud = await cloudinary.uploader.upload(req.file.path);
            user.avatar = cloud.secure_url;
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

        const checkEmail = await User.find({ email: email }).exec();

        if (checkEmail.length > 0) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        if (phone.length > 10) {
            return res.status(301).json({
                message: "Your phone number is invalid"
            });
        }

        const checkPhone = await User.find({ phone: phone }).exec();

        if (checkPhone.length > 0) {
            return res.status(409).json({
                message: "Phone already registered"
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

        if (!findStaffs || findStaffs.length === 0) {
            return res.status(404).json({
                message: "Staffs not found"
            });
        }

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

        if (!findStaff) {
            return res.status(404).json({
                message: "Staff not found"
            });
        }

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

        if (!findManagers || findManagers.length === 0) {
            return res.status(404).json({
                message: "Managers not found"
            });
        }

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

        if (!findManager) {
            return res.status(404).json({
                message: "Manager not found"
            });
        }

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

        if (!deleteAccount) {
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
            const hashedPassword = await bcrypt.hash('123456', 10);
            user.password = hashedPassword
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

const getCustomers = async (req, res) => {
    try {
        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        if (checkUser.role !== 'staff') {
            return res.status(403).json({
                message: "You don't have permission to access this"
            })
        }

        const findCustomers = await User.find({
            role: 'customer'
        }).exec();

        if (!findCustomers || findCustomers.length === 0) {
            return res.status(404).json({
                message: "Customers not found"
            });
        }

        return res.status(200).json({
            message: "All customers found",
            data: findCustomers
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const getCustomer = async (req, res) => {
    try {
        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        if (checkUser.role !== 'staff') {
            return res.status(403).json({
                message: "You don't have permission to access this"
            })
        }

        const id = req.params.customerId;

        const findCustomer = await User.findOne({
            _id: id,
            role: 'customer'
        }).exec();

        if (!findCustomer) {
            return res.status(404).json({
                message: "Invalid id, customer not found"
            });
        }

        const findCustomerTicket = await Ticket.find({
            user: findCustomer._id
        }).exec();

        return res.status(200).json({
            message: "Customer information found",
            data: {
                customer: findCustomer,
                ticket: findCustomerTicket
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

const search = async (req, res) => {
    try {
        const input = req.query.input;

        const currentUser = req.userData._id;

        const checkUser = await User.findById(currentUser).exec();

        let findUsers
        if (checkUser.role === 'admin') {
            findUsers = await User.find(
                {
                    $and: [
                        {
                            $or: [
                                { role: 'staff' },
                                { role: 'manager' }
                            ]
                        },
                        { $text: { $search: input } }
                    ]
                }
            ).exec();
        }
        else if (checkUser.role === 'staff') {
            findUsers = await User.find({
                $and: [
                    { role: 'customer' },
                    { $text: { $search: input } },
                    {
                        _id: { $ne: req.userData._id.toString() }
                    }
                ]
            }).exec();
        }
        else {
            return res.status(403).json({
                message: "You don't have permission to access this"
            })
        }

        if (!findUsers || findUsers.length === 0) {
            return res.json([]);
        }

        return res.status(200).json({
            message: "Users found",
            data: findUsers
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}

module.exports = {
    register,
    verify,
    resetPassword,
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
    getCustomers,
    getCustomer,
    search
}