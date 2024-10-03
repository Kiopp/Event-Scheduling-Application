// backend/routes/eventRoutes.js
const express = require('express');
const { ObjectId } = require('mongodb');

const router = express.Router();

// Get a single event by ID
router.get('/:id', async (req, res) => {
    const db = req.app.locals.db;
    
    try {
        const eventId = req.params.id;

        // Validate the ID
        if (!ObjectId.isValid(eventId)) {
            return res.status(400).json({ message: 'Invalid event ID' });
        }

        // Find the event in the database
        const event = await db.collection('events').findOne({ _id: new ObjectId(eventId) });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ message: 'Failed to fetch event', error: error.message });
    }
});

module.exports = router;