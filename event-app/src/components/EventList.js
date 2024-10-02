import EventCard from './EventCard';

import { Grid2 } from '@mui/material';

import React, { useState, useEffect } from 'react';

function EventList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch events data from the API
    useEffect(() => {
        fetch('http://localhost:5001/api/events') 
            .then(response => response.json())
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    // Display loading state or error if any
    if (loading) return <div>Loading events...</div>;
    if (error) return <div>Error fetching events: {error.message}</div>;

    return (
      <Grid2 container spacing={1}>
          {events.map((event) => (
              <EventCard title={event.title} 
              date={event.startDate} 
              endDate={event.endDate} 
              startTime={event.startTime} 
              endTime={event.endTime} 
              description={event.description} 
              id={event.id}/>
          ))}
      </Grid2>
    );
}

export default EventList;