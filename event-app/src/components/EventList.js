import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Grid, Button, Box } from '@mui/material';
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
  const [showFilters, setShowFilters] = useState(false);
  const [singleDay, setSingleDay] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarTriggered, setSnackbarTriggered] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5001/api/events')
      .then(response => response.json())
      .then(data => {
        setEvents(data);
        setFilteredEvents(data);
        setLoading(false);
      })
      .catch(err => {
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
    setFilteredEvents(events);
  };

  const handleFilterByDate = () => {
    const dateFilteredEvents = events.filter((event) => {
      const matchesStartDate = startDate
        ? dayjs(event.startDate).isSameOrAfter(dayjs(startDate).startOf('day'))
        : true;

      const matchesEndDate = endDate
        ? dayjs(event.endDate).isSameOrBefore(dayjs(endDate).endOf('day'))
        : true;

      return matchesStartDate && matchesEndDate;
    });
    setFilteredEvents(dateFilteredEvents);
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

  const searchFilteredEvents = filteredEvents.filter((event) =>
    event.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const toggleFilterSection = () => {
    setShowFilters(!showFilters);
  };

  const [endDateKey, setEndDateKey] = useState(null);

  useEffect(() => {
    setEndDateKey(Math.random().toString());
  }, []);

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error fetching events: {error.message}</div>;

  return (
    <div>
      {/* Search Input */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <TextField label="Search by Title"
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
          <Box display="flex" justifyContent="center" mb={ 1}>
            <Box display="flex" ml={-2} justifyContent ="space-between " width="45 %">
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={handleStartDateChange}
                renderInput={(params) => <TextField {...params} />}
                style={{ marginRight: '8px' }}
                clearable
              />
              <Box mr={2} />
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={handleEndDateChange}
                onClose={(event) => {
                  if (event.type === 'cancel') {
                    setEndDate(null);
                  }
                }}
                renderInput={(params) => <TextField {...params} />}
                clearable
                key={endDateKey}
              />
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
            <Button variant="contained" onClick={handleFilterByDate} style={{ marginRight: '16px' }}>
              Apply Date Filters
            </Button>
            <Button variant="outlined" onClick={handleResetFilters}>
              Reset Filters
            </Button>
          </Box>
        </Box>
      )}

      {/* Display Events */}
      <Grid container spacing={1} justifyContent="center">
        {searchFilteredEvents.map((event) => (
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