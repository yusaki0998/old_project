const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const ScheduleController = require('../bl/schedule-controller');

router.post('/', checkAuth, ScheduleController.createSchedule);
router.get('/', ScheduleController.getSchedules);
router.get('/:scheduleId', ScheduleController.getSchedule);
router.put('/:scheduleId', checkAuth, ScheduleController.editSchedule);
router.delete('/:scheduleId', checkAuth, ScheduleController.deleteSchedule);
router.get('/movies/:movieId', checkAuth, ScheduleController.getMovieSchedule);

module.exports = router;