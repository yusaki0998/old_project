const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const ReportController = require('../bl/report-controller');

router.get('/', ReportController.revenueReports);

module.exports = router;