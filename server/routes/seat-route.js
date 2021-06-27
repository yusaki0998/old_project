const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const SeatController = require('../bl/seat-controller');

router.post('/', SeatController.addSeat);
router.get('/', SeatController.getSeats);

module.exports = router;