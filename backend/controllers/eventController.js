const events = require('../model/TestGetEvents.js');

const getEvents = (req, res) => {
    res.json(events);
};

module.exports = {
    getEvents,
};