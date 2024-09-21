const express = require('express');

const app = express();

app.get('/api/events/:event_id', (req, res) => {
  const eventId = req.params.event_id;
  const eventData = {
    title: 'Event Title',
    date: '2023-03-15',
    start_time: '10:00 AM',
    end_time: '12:00 PM',
    description: 'This is a sample event description.'
  };
  res.json(eventData);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get('/', (req, res) => {
    console.log('Root route reached!');
    res.send('Welcome to my app!');
  });