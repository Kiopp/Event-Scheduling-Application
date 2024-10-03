import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function EventPage() {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { event_id } = useParams(); // Get the event ID from the URL

    useEffect(() => {
      console.log('Fetching event with ID:', event_id);
      // Fetch event from the backend by ID
      fetch(`http://localhost:5001/api/event/${event_id}`)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Event not found');
              }
              return response.json();
          })
          .then(data => {
              console.log('Fetched event:', data); // Log the fetched data
              setEvent(data);
              setLoading(false);
          })
          .catch(err => {
              console.error('Error fetching event:', err); // Log any errors
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
                    <h1 className='PageTitle'>{event.title}</h1>
                    <p><strong>Date: </strong>{event.singleDay ? event.startDate : `${event.startDate} - ${event.endDate}`}</p>
                    <p><strong>Start Time: </strong>{event.startTime}</p>
                    <p><strong>End Time: </strong>{event.endTime}</p>
                    <p><strong>Description: </strong>{event.description}</p>
                </div>
            )}
        </div>
    );
}

export default EventPage;