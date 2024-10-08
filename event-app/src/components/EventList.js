import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Grid, Button, Box, MenuItem } from '@mui/material';
import DatePicker from './DatePicker';
import EventCard from './EventCard';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import CustomCheckbox from './Checkbox';
import CustomSnackbar from './CustomSnackbar';
import axios from 'axios';
import { getUserFriends } from './../model-data/FriendData';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

function EventList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [tempFilteredEvents, setTempFilteredEvents] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [singleDay, setSingleDay] = useState(false);
  const [eventTypeFilter, setEventTypeFilter] = useState('all');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarTriggered, setSnackbarTriggered] = useState(false);
  const [publicEvents, setPublicEvents] = useState([]);
  const [privateEvents, setPrivateEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState(null);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchUserId = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/session', {
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const sessionData = await response.json();
            setUserId(sessionData.user.userId);
        } catch (error) {
            console.error('Error fetching user session:', error);
            setError(error);
            setLoading(false);
        }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (!userId) return;
  
    const fetchFriends = async () => {
      setLoading(true);
      try {
        const fetchedFriends = await getUserFriends();
        console.log("Friends:", fetchedFriends);
        setFriends(fetchedFriends);
  
        const allPrivateEvents = []; // To store all private events from different users
  
        const privateEvents = await Promise.all(
          fetchedFriends.map(async (request) => {
            try {
              const userResponse = await fetch(
                `http://localhost:5001/api/user/${request.id}/private-events`,
                {
                  credentials: "include",
                }
              );
  
              if (!userResponse.ok) {
                throw new Error(`HTTP error! status: ${userResponse.status}`);
              }
  
              const userData = await userResponse.json();
  
              // Collect all private events
              allPrivateEvents.push(...userData);
  
              console.log(`User summary for ${request.sender}:`, userData);
  
              return { ...request, username: userData.username };
            } catch (userError) {
              console.error("Error fetching user summary:", userError);
              return { ...request, username: "Unknown User" };
            }
          })
        );
  
        setPrivateEvents(allPrivateEvents); // Set all the collected private events at once
      } catch (error) {
        console.error("Error fetching friends:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchFriends();
  }, [userId]);
/*
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if the user is in session
        const sessionResponse = await axios.get('http://localhost:5001/api/session', { withCredentials: true });
        const loggedInUser = sessionResponse.data.user;
        
        if (loggedInUser) {
          // If the user is logged in, fetch user-specific events
          const userID = loggedInUser._id;

          // Fetch friends
          const friendResponse = await axios.get('http://localhost:5001/api/friends', { withCredentials: true });

          // Extract friend IDs
          const friendIds = friendResponse.data.map(friend => friend._id);
          console.log(friendResponse);
          
          // Create an array of IDs to include the user ID
          const allUserIds = [userID, ...friendIds];

          console.log(allUserIds);

          // Fetch private events for the user and their friends
          const privateEventsPromises = allUserIds.map(id =>
            axios.get(`http://localhost:5001/api/user/${id}/private-events`, { withCredentials: true })
          );

          // Wait for all private events requests to complete
          const privateEventsResponses = await Promise.all(privateEventsPromises);
          
          // Combine all private events from the responses
          const allPrivateEvents = privateEventsResponses.flatMap(response => response.data);
          setPrivateEvents(allPrivateEvents);

          const publicResponse = await axios.get('http://localhost:5001/api/events/public');
          setPublicEvents(publicResponse.data)

          const allEvents = [...privateEvents, ...publicEvents]

          // Set events for logged-in users (including private and public)
          setEvents(allEvents);
          setFilteredEvents(allEvents);
          setTempFilteredEvents(allEvents);
        } else {
          // If no user is logged in, fetch public events only
          fetchPublicEvents();
        }
      } catch (err) {
        // In case of error or no session, fallback to fetching public events
        fetchPublicEvents();
      } finally {
        setLoading(false); // Stop loading after the request completes
      }
    };

    const fetchPublicEvents = async () => {
      try {
        // Fetch public events for non-logged-in users
        const response = await axios.get('http://localhost:5001/api/events/public');
        const data = response.data;

        setEvents(data);
        setFilteredEvents(data);
        setTempFilteredEvents(data);
      } catch (err) {
        setError('Failed to fetch events.');
      }
    };
    fetchData();
  }, [ privateEvents, publicEvents]);

  */

  const validateEndDate = useCallback(() => {
    if (startDate && endDate) {
      if (dayjs(endDate).isBefore(dayjs(startDate))) {
        setEndDate(null);
        setSnackbarTriggered(true);
      }
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (snackbarTriggered) {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
        setSnackbarTriggered(false);
      }, 5000);
    }
  }, [snackbarTriggered]);

  useEffect(() => {
    validateEndDate();
  }, [startDate, endDate, validateEndDate]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStartDate(null);
    setEndDate(null);
    setSingleDay(false);
    setEventTypeFilter('all');
    setFilteredEvents(events);
    setTempFilteredEvents(events);
  };

  const handleStartDateChange = (newValue) => {
    if (newValue === null) {
      setStartDate(null);
    } else {
      const validStartDate = dayjs(newValue);
      setStartDate(validStartDate);
      if (singleDay) {
        setEndDate(dayjs(validStartDate).endOf('day'));
      } else {
        validateEndDate();
      }
    }
  };

  const handleEndDateChange = (newValue) => {
    if (newValue === null) {
      setEndDate(null);
    } else {
      const validEndDate = dayjs(newValue);
      setEndDate(validEndDate);
      validateEndDate();
    }
  };

  const applyFilters = useCallback(() => {
    let filtered = events;

    if (startDate || endDate) {
      filtered = filtered.filter((event) => {
        const eventStart = dayjs(event.startDate).startOf('day');
        const eventEnd = dayjs(event.endDate).endOf('day');

        if (singleDay && startDate) {
          return dayjs(startDate).isBetween(eventStart, eventEnd, null, '[]');
        }

        const matchesStartDate = startDate
          ? eventStart.isSameOrAfter(dayjs(startDate).startOf('day'))
          : true;
        const matchesEndDate = endDate
          ? eventEnd.isSameOrBefore(dayjs(endDate).endOf('day'))
          : true;

        return matchesStartDate && matchesEndDate;
      });
    }

    if (eventTypeFilter !== 'all') {
      filtered = filtered.filter((event) => {
        if (eventTypeFilter === 'single') return event.singleDay;
        if (eventTypeFilter === 'multi') return !event.singleDay;
        return true;
      });
    }

    setTempFilteredEvents(filtered);
  }, [startDate, endDate, events, eventTypeFilter, singleDay]);

  useEffect(() => {
    const searchFilteredEvents = tempFilteredEvents.filter((event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(searchFilteredEvents);
  }, [searchQuery, tempFilteredEvents]);

  const toggleFilterSection = () => {
    setShowFilters(!showFilters);
  };

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error fetching events: {error.message}</div>;

  return (
    <div>
      {/* Search Input */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <TextField
          label="Search by Title"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
          style={{ marginRight: '16px' }}
        />
        <Button variant="outlined" onClick={toggleFilterSection}>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </Box>

      {/* Conditional rendering of the filter section */}
      {showFilters && (
        <Box mb={3}>
          <Box display="flex" justifyContent="center" mb={2}>
            {/* Event Type Filter */}
            <TextField
              select
              label="Event Type"
              value={eventTypeFilter}
              onChange={(event) => setEventTypeFilter(event.target.value)}
              variant="outlined"
              style={{ width: '200px', marginRight: '16px' }}
            >
              <MenuItem value="all">All Events</MenuItem>
              <MenuItem value="single">Single Day Events</MenuItem>
              <MenuItem value="multi">Multi-Day Events</MenuItem>
            </TextField>
          </Box>
          <Box display="flex" justifyContent="center" mb={1}>
            <Box display="flex" ml={-2} justifyContent="space-between" width="45%">
              <DatePicker
                label={singleDay ? 'Date' : 'Start Date'}
                value={startDate}
                onChange={handleStartDateChange}
                renderInput={(params) => <TextField {...params} />}
                style={{ marginRight: '8px' }}
                clearable
              />
              {!singleDay && (
                <>
                  <Box mr={2} />
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    clearable
                  />
                </>
              )}
            </Box>
            <CustomCheckbox
              label="Single Day Event"
              checked={singleDay}
              onChange={(event) => {
                const isChecked = event.target.checked;
                setSingleDay(isChecked);
                if (isChecked) {
                  setStartDate(null);
                  setEndDate(null);
                } else {
                  setEndDate(null);
                }
              }}
            />
          </Box>
          <Box display="flex" justifyContent="center" mt={1}>
            <Button variant="contained" onClick={applyFilters} style={{ marginRight: '16px' }}>
              Apply Filters
            </Button>
            <Button variant="outlined" onClick={handleResetFilters}>
              Reset Filters
            </Button>
          </Box>
        </Box>
      )}

      {/* Display Events */}
      <Grid container spacing={1} justifyContent="center">
        {privateEvents.map((event) => (
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

      {/* Snackbar for end date error */}
      {showSnackbar && (
        <CustomSnackbar
          open={showSnackbar}
          onClose={() => setShowSnackbar(false)}
          message="End date cannot be before start date"
        />
      )}
    </div>
  );
}

export default EventList;