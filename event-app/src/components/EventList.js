import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Grid, Button, Box } from '@mui/material';
import DateTimePicker from './DateTimePicker';
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
  const [endDateError, setEndDateError] = useState(false);
  const [showEndDateError, setShowEndDateError] = useState(false);

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

  useEffect(() => {
    if (endDateError) {
      setShowEndDateError(true);
      setTimeout(() => {
        setShowEndDateError(false);
      }, 5000);
    }
  }, [endDateError]);

  const validateEndDate = useCallback(() => {
    if (startDate && endDate) {
      if (dayjs(endDate).isBefore(dayjs(startDate))) {
        setEndDateError(true);
        setEndDate(null);
      } else {
        setEndDateError(false);
      }
    }
  }, [startDate, endDate]);

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
        ? dayjs(event.startDate).isSameOrAfter(dayjs(startDate))
        : true;

      const matchesEndDate = endDate
        ? dayjs(event.endDate).isSameOrBefore(dayjs(endDate))
        : true;

      return matchesStartDate && matchesEndDate;
    });
    setFilteredEvents(dateFilteredEvents);
  };

  const handleStartDateChange = (newValue) => {
    const validStartDate = newValue ? dayjs(newValue) : null;
    setStartDate(validStartDate);
    if (singleDay) {
      setEndDate(dayjs(validStartDate).hour(23).minute(59));
    } else {
      validateEndDate();
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
          <Box display="flex" justifyContent="center" mb={1}>
            {/* Conditional rendering based on singleDay */}
            {singleDay ? (
              <DateTimePicker
                label="Start Date & Time"
                value={startDate}
                onChange={handleStartDateChange}
                renderInput={(params) => <TextField {...params} />}
                clearable
              />
            ) : (
              < Box display="flex" justifyContent="space-between" width="100%">
                <DateTimePicker
                  label="Start Date & Time"
                  value={startDate}
                  onChange={handleStartDateChange}
                  renderInput={(params) => <TextField {...params} />}
                  style={{ marginRight: '16px' }}
                  clearable
                />
                <DateTimePicker
                  label="End Date & Time"
                  value={endDate}
                  onChange={handleEndDateChange}
                  renderInput={(params) => <TextField {...params} />}
                  clearable
                  key={endDate?.toISOString()}
                />
              </Box>
            )}
          </Box>

          {/* Checkbox for single day event */}
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

          {/* Buttons for applying filters and resetting filters */}
          <Box display="flex" justifyContent="flex-start" mt={1}>
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
      {showEndDateError && (
        <CustomSnackbar
          open={showEndDateError}
          onClose={() => setShowEndDateError(false)}
          message="End date cannot be before start date"
        />
      )}
    </div>
  );
}

export default EventList;