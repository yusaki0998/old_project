const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const upload = require('../utils/multer');

const UserController = require('../bl/user-controller');

router.post('/register', UserController.register);
router.put('/verify', UserController.verify);
router.post('/recover-password', UserController.recoverPassword);
router.patch('/reset-password', UserController.resetPassword);
router.post('/login', UserController.login);
router.get('/profile', checkAuth, UserController.profile);
router.put('/update-profile', checkAuth, upload.single('avatar'), UserController.updateProfile);
router.patch('/change-password', checkAuth, UserController.changePassword);
router.post('/add-account', checkAuth, UserController.addAccount);
router.get('/get-staffs', checkAuth, UserController.getStaffs);
router.get('/get-staffs/:staffId', checkAuth, UserController.getStaff);
router.get('/get-managers', checkAuth, UserController.getManagers);
router.get('/get-managers/:managerId', checkAuth, UserController.getManager);
router.delete('/delete-account/:accountId', checkAuth, UserController.deleteAccount);
router.put('/edit-account/:accountId', checkAuth, UserController.editAccount);
router.get('/get-customers', checkAuth, UserController.getCustomers);
router.get('/get-customers/:customerId', checkAuth, UserController.getCustomer);
router.post('/search', checkAuth, UserController.search);

module.exports = router;