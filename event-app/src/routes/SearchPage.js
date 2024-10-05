import React, { useState, useEffect } from 'react';
import { TextField, Grid2, Button, Box } from '@mui/material';
import DatePicker from '../components/DatePicker';
import EventCard from '../components/EventCard';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

function SearchAndFilterEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    // Fetch events data from the API
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

    // Handle search input changes
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Handle filter reset
    const handleResetFilters = () => {
        setSearchQuery('');
        setStartDate(null);
        setEndDate(null);
        setFilteredEvents(events);
    };

    // Filter events based on date
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

    // Filter events based on title (search functionality)
    const searchFilteredEvents = filteredEvents.filter((event) =>
        event.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    // Toggle the filter section visibility
    const toggleFilterSection = () => {
        setShowFilters(!showFilters);
    };

    // Display loading state or error if any
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

                {/* Button to toggle the visibility of the filter section */}
                <Button variant="outlined" onClick={toggleFilterSection}>
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
            </Box>

            {/* Conditional rendering of the filter section */}
            {showFilters && (
                <Box mb={3}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                        {/* Date picker for filtering events */}
                        <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                            style={{ marginRight: '16px' }}
                        />

                        <DatePicker
                            label="End Date"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Box>

                    {/* Buttons for applying filters and resetting filters */}
                    <Box display="flex" justifyContent="flex-start">
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
            <Grid2 container spacing={1} justifyContent="center">
                {searchFilteredEvents.map((event) => (
                    <Grid2 item xs={12} sm={6} md={4} lg={4} key={event._id}>
                        <EventCard
                            title={event.title}
                            startDate={event.startDate}
                            endDate={event.endDate}
                            startTime={event.startTime}
                            endTime={event.endTime}
                            description={event.description}
                            singleDay={event.singleDay}
                            id={event._id}
                        />
                    </Grid2>
                ))}
            </Grid2>
        </div>
    );
}

export default SearchAndFilterEvents;