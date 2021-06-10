const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');

const UserController = require('../controllers/user-controller');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/profile', checkAuth, UserController.profile);

module.exports = router;