import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const events = require('../model-data/TestGetEvents.js');  // Import the list of Events from the TestGetEvents.js file DELETE WHEN BACKEND IS IMPLEMENTED

function EventPage() {
    const [event, setEvent] = useState(null);
    const { event_id } = useParams();


    useEffect(() => {
      const foundEvent = events.find(evnt => parseInt(evnt.id) === parseInt(event_id));
      setEvent(foundEvent);
    }, [event_id])

    return (
      <div className='Content'>
          {event && (
              <div>
                  <h1 className='PageTitle'>{event.title}</h1>
                  <p><strong>Date: </strong>{event.date}</p>
                  <p><strong>Start Time: </strong>{event.startTime}</p>
                  <p><strong>End Time: </strong>{event.endTime}</p>
                  <p><strong>Description: </strong>{event.description}</p>
              </div>
          )}
      </div>
  );
}

export default EventPage;