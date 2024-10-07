import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card, CardContent, Divider, Box, Stack } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import dayjs from 'dayjs';

function EventPage() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { event_id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5001/api/event/${event_id}`)
      .then(response => {
        if (!response.ok) throw new Error('Event not found');
        return response.json();
      })
      .then(data => {
        const startDateTime = dayjs(`${data.startDate}T${data.startTime}`);
        const endDateTime = dayjs(`${data.endDate}T${data.endTime}`);
        setEvent({ ...data, startDateTime, endDateTime });
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [event_id]);

  if (loading) return <div>Loading event details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ backgroundColor: 'var(--clr-background-mid)', padding: 4 }}
    >
      {event && (
        <Card sx={{ maxWidth: 900, boxShadow: 4, borderRadius: 3, bgcolor: 'var(--clr-background-dark)' }}>
          <CardContent>
            <Typography
              variant="h3"
              gutterBottom
              color="primary"
              sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 3 }}
            >
              {event.title || 'Untitled Event'}
            </Typography>

            <Divider sx={{ marginY: 3 }} />

            <Stack direction="row" spacing={2} alignItems="center">
              <EventIcon color="primary" />
              <Typography variant="h5" color="textSecondary">
                {event.singleDay ? 'Event Date & Time' : 'Event Dates & Times'}
              </Typography>
            </Stack>

            <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
              {event.singleDay ? (
                <>
                  <Typography variant="body1" gutterBottom sx={{ fontSize: '1.3rem', fontWeight: 500 }}>
                    {dayjs(event.startDate).format('dddd, MMMM D, YYYY')}
                  </Typography>
                  <Typography variant="body1" gutterBottom sx={{ fontSize: '1.3rem', fontWeight: 500 }}>
                    <AccessTimeIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                    {dayjs(event.startDateTime).format('HH:mm')} - {dayjs(event.endDateTime).format('HH:mm')}
                  </Typography>
                </>
              ) : (
                <Typography variant="body1" gutterBottom sx={{ fontSize: '1.3rem', fontWeight: 500 }}>
                  {dayjs(event.startDateTime).format('dddd, MMMM D, YYYY HH:mm')} -{' '}
                  {dayjs(event.endDateTime).format('dddd, MMMM D, YYYY HH:mm')}
                </Typography>
              )}
            </Box>

            <Divider sx={{ marginY: 3 }} />

            <Stack direction="row" spacing={2} alignItems="center">
              <DescriptionIcon color="primary" />
              <Typography variant="h5" color="textSecondary">
                Description
              </Typography>
            </Stack>

            <Typography variant="body1" sx={{ fontStyle: 'italic', fontSize: '1.3rem' }}>
              {event.description || 'No description available.'}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default EventPage;