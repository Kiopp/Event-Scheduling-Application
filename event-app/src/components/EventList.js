import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Grid, Button, Box, MenuItem } from '@mui/material';
import DatePicker from './DatePicker';
import EventCard from './EventCard';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import CustomCheckbox from './Checkbox';
import CustomSnackbar from './CustomSnackbar';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

function EventList() {
  const [events, setEvents] = useState([]);
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

  useEffect(() => {
    fetch('http://localhost:5001/api/events')
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
        setTempFilteredEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

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
        {filteredEvents.map((event) => (
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