import React, { useState, useEffect, useRef } from 'react';
import EventCard from './EventCard';

import { Grid2 } from '@mui/material';

const events = require('../model-data/TestGetEvents.js');  // Import the list of Events from the TestGetEvents.js file DELETE WHEN BACKEND IS IMPLEMENTED

function EventList() {
    /* THIS CODE COULD BE USED TO QUERY THE MODEL DATA
    const [events, setEvents] = useState([]);        // State to hold event data
    const [loading, setLoading] = useState(true);    // Loading state
    const [error, setError] = useState(null);        // Error state

    const fetchCalled = useRef(false);  // Ref to track if API call has been made

    // Fetch the data when the component is being mounted
    useEffect(() => {
        // Prevent multiple API calls
        if (fetchCalled.current) return;

        fetchCalled.current = true;  // Mark API call as done
        
        const fetchData = async () => {
          setLoading(true);  // Set loading to true when fetching begins
          try {
            const data = await getEventsData();       // Call the model to get the data
            setEvents(data);                          // Set the events to state
          } catch (error) {
            setError(error);                          // Handle any error
          } finally {
            setLoading(false);                        // End loading state
          }
        };

        fetchData();  // Trigger the data fetching
  }, []);  // Empty dependency array means this runs only once, on component mount

  if (loading) return <p>Loading events...</p>;  // Display loading text while fetching
  if (error) return <p>Error: {error.message}</p>;  // Display error message if error occurs
  */

    return (
        <Grid2 container spacing={1}>
            {events.map((event) => (
                <EventCard title={event.title} date={event.date} startTime={event.startTime} endTime={event.endTime} description={event.description} id={event.id}/>
            ))}
        </Grid2>
      );
}

export default EventList;