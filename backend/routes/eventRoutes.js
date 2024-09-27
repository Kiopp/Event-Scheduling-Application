const { getEvents } = require('../controllers/eventController');
const express = require('express');
const router = express.Router();

router.get('/', getEvents);

router.post('/', async (req, res) => {
    try {
        const { title, startDate, endDate, startTime, endTime, description } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title, start date, and start time are required.' });
        }

        const newEvent = {
            title,
            startDate,
            endDate,
            startTime,
            endTime,
            description,
        };

        const result = await req.app.locals.db.collection('events').insertOne(newEvent);

        res.redirect(302, 'http://localhost:3000/events');
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Event creation failed', error: error.message });
    }
});

module.exports = router;
