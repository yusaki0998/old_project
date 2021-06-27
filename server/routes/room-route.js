const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const RoomController = require('../bl/room-controller');

router.post('/', checkAuth, RoomController.createRoom);
router.get('/', RoomController.getRooms);
router.get('/:roomId', RoomController.getRoom);
router.put('/:roomId', checkAuth, RoomController.updateRoom);
router.delete('/:roomId', checkAuth, RoomController.deleteRoom);

module.exports = router;