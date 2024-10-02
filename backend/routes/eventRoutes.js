const { getEvents } = require('../controllers/eventController');
const express = require('express');
const router = express.Router();

router.get('/', getEvents);

module.exports = router;
