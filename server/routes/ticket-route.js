const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const TicketController = require('../bl/ticket-controller');

router.get('/movies/:movieId', checkAuth, TicketController.getMovieSchedule);
router.get('/seats/:scheduleId', checkAuth, TicketController.getScheduleSeats);
router.post('/:scheduleId', checkAuth, TicketController.createTicket);
router.get('/', checkAuth, TicketController.getTickets);
router.get('/:ticketId', checkAuth, TicketController.getTicket);
router.patch('/:ticketId', checkAuth, TicketController.updateTicketStatus);
router.delete('/:ticketId', checkAuth, TicketController.deleteTicket);

module.exports = router;