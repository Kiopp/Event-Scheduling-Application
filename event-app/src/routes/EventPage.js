import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';

function EventPage() {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { event_id } = useParams(); // Get the event ID from the URL

    useEffect(() => {
        console.log('Fetching event with ID:', event_id);
        fetch(`http://localhost:5001/api/event/${event_id}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Event not found');
            }
            return response.json();
          })
          .then(data => {
            console.log('Fetched event:', data);
      
            // Combine date and time for start and end
            const startDateTime = dayjs(`${data.startDate}T${data.startTime}`);
            const endDateTime = dayjs(`${data.endDate}T${data.endTime}`);
      
            // Update the event data
            setEvent({
              ...data,
              startDateTime,
              endDateTime
            });
            
            setLoading(false);
          })
          .catch(err => {
            console.error('Error fetching event:', err);
            setError(err.message);
            setLoading(false);
          });
      }, [event_id]);

    // Display loading or error state if necessary
    if (loading) return <div>Loading event details...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='Content'>
          {event && (
            <div>
              <Typography gutterBottom variant="h5" component="div">
                {event.title || 'Untitled Event'}
              </Typography>
      
              {event.singleDay ? (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Date: {dayjs(event.startDate).format('YYYY-MM-DD')}
                </Typography>
              ) : (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Date: {dayjs(event.startDateTime).format('YYYY-MM-DD')} - {dayjs(event.endDateTime).format('YYYY-MM-DD')}
                </Typography>
              )}
      
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Time: {dayjs(event.startDateTime).format('HH:mm')} - {dayjs(event.endDateTime).format('HH:mm')}
              </Typography>
      
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Description: {event.description || 'No description available.'}
              </Typography>
            </div>
          )}
        </div>
      );      
}

export default EventPage;