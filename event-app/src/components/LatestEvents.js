import { Box, Grid, Typography } from '@mui/material';
import EventCard from './EventCard';
import React, {useEffect, useState} from 'react';
import { getLatestEvents } from '../model-data/EventData';

export default function LatestEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch friend list
    useEffect(() => {
        const fetchLatestEvents = async () => { 
          setLoading(true);
          try {
            const fetchedEvents = await getLatestEvents();
            setEvents(fetchedEvents);
          } catch (error) {
            console.error('Error fetching latest events:', error);
            setError(error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchLatestEvents();
    }, []);

      // Handle loading state
      if (loading) {
        return <div>Loading friend requests...</div>;
      }

      // Handle error state
      if (error) {
          return <div>Error loading friend requests: {error.message}</div>;
      }

      // Handle no found events
      if (events.length === 0) {
          return <div>No events found</div>;
      }

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '3rem', marginBottom: '3rem', flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant='h4'>
                Latest events
            </Typography>
            <Grid container spacing={1} sx={{justifyContent: 'center', marginTop: '1rem'}}>
                {events.map((event) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} key={event._id}>
                        <EventCard
                          title={event.title}
                          startDate={event.startDate}
                          endDate={event.endDate}
                          startTime={event.startTime || '00:00'}
                          endTime={event.endTime || '23:59'}
                          description={event.description}
                          singleDay={event.singleDay}
                          id={event._id}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>

    );
}