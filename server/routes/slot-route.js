const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const SlotController = require('../controllers/slot-controller');

router.post('/', checkAuth, SlotController.createSlot);
router.get('/', SlotController.getSlots);
router.get('/:slotId', SlotController.getSlot);
router.put('/:slotId', checkAuth, SlotController.updateSlot);
router.delete('/:slotId', checkAuth, SlotController.deleteSlot);

module.exports = router;