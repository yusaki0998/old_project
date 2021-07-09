const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const SeatController = require('../bl/seat-controller');

router.post('/seat-maps', SeatController.addSeatMap);
router.get('/seat-maps', SeatController.getSeatMaps);
router.get('/seat-maps/:mapId', SeatController.getSeatMap);
router.get('/:mapId/:seatId', SeatController.getSeatInMap);
router.put('/:mapId', SeatController.editSeatInMap);

module.exports = router;