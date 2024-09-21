import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventPage = () => {
    const { event_id } = useParams();
    const [event, setEvent] = useState(null);
  
    useEffect(() => {
      axios.get(`/api/events/${event_id}`)
        .then(response => {
          setEvent(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, [event_id]);

    return (
        <div>
            <h1>{event.title}</h1>
            <p><strong>Date:</strong>{event.date}</p>
            <p><strong>Start Time</strong>{event.startTime}</p>
            <p><strong>End Time</strong>{event.endTime}</p>
            <p><strong>Description</strong>{event.description}</p>
        </div>
    );   
}

export default EventPage;