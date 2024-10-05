import React from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard'; // Adjust the path as necessary
import { Grid2 } from '@mui/material';
import { CircularProgress } from '@mui/material'; // For loading indicator

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      events: [],
      loading: true,
      errorMessage: ''
    };
  }

  componentDidMount() {
    // Fetch user data
    axios.get('http://localhost:5001/api/session', { withCredentials: true })
      .then(response => {
        // User is logged in
        this.setState({ user: response.data.user });

        // Fetch user's events
        axios.get('http://localhost:5001/api/user/events', { withCredentials: true })
          .then(eventsResponse => {
            this.setState({ events: eventsResponse.data, loading: false });
          })
          .catch(error => {
            console.error('Error fetching user events:', error);
            this.setState({ errorMessage: 'Failed to load your events.', loading: false });
          });

      })
      .catch(error => {
        // No active session
        console.error('No active session', error);
        this.setState({ errorMessage: 'Please log in to view your profile.', loading: false });
        // Optionally redirect to login page
        // this.props.navigate('/login');
      });
  }

  render() {
    const { user, events, loading, errorMessage } = this.state;

    if (loading) {
      return (
        <div className="loading">
          <CircularProgress />
          <p>Loading your profile...</p>
        </div>
      );
    }

    if (errorMessage) {
      return (
        <div className="error-message">
          {errorMessage}
        </div>
      );
    }

    return (
      <div className="ProfilePage">
        <h1>Profile</h1>
        <div className="UserInfo">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <h2>Your Events</h2>
        {events.length === 0 ? (
          <p>You have not created any events yet.</p>
        ) : (
          <Grid2 container spacing={2} justifyContent="center">
            {events.map(event => (
              <Grid2 item xs={12} sm={6} md={4} lg={3} key={event._id}>
                <EventCard
                  id={event._id}
                  title={event.title}
                  startDate={event.startDate}
                  endDate={event.endDate}
                  startTime={event.startTime}
                  endTime={event.endTime}
                  description={event.description}
                  singleDay={event.singleDay}
                />
              </Grid2>
            ))}
          </Grid2>
        )}
      </div>
    );
  }
}

export default ProfilePage;