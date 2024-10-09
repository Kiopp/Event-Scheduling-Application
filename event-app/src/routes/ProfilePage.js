import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard'; 
import { Button, Grid2 } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { checkFriend, sendFriendRequest, checkPendingRequest } from '../model-data/FriendData';

function ProfilePage() {
  const [session, setSession] = useState(null); // Store session
  const { userId } = useParams();
  const [isFriend, setIsFriend] = useState(false);
  const [hasPendingRequest, setPendingRequest] = useState(false);
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Check local storage for user information on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setSession(storedUser);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    // Fetch user data
    axios.get(`http://localhost:5001/api/user/${userId}`)
      .then(response => {
        setUser(response.data.user);

        // Fetch user's events
        axios.get(`http://localhost:5001/api/user/${userId}/events`)
          .then(eventsResponse => {
            setEvents(eventsResponse.data);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching user events:', error);
            setErrorMessage('Failed to load user events.');
            setLoading(false);
          });
      })
      .catch(error => {
        console.error('Error fetching user data', error);
        setErrorMessage('User not found.');
        setLoading(false);
      });

      // Fetch friend status
      const fetchIsFriends = async () => { 
        setLoading(true);
        try {
          const friendStatus = await checkFriend(userId);
          setIsFriend(friendStatus);
        } catch (error) {
          console.error('Error fetching friends:', error);
          setErrorMessage(error);
        } finally {
          setLoading(false);
        }
      };

      // Fetch friend request status
      const fetchRequestStatus = async () => { 
        setLoading(true);
        try {
          const friendStatus = await checkPendingRequest(userId);
          setPendingRequest(friendStatus);
        } catch (error) {
          console.error('Error fetching friends:', error);
          setErrorMessage(error);
        } finally {
          setLoading(false);
        }
      };
    
      fetchRequestStatus();
      fetchIsFriends();

  }, [userId]);

  if (loading) {
    return (
      <div className="loading">
        <CircularProgress />
        <p>Loading profile...</p>
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

  const isOwner = session.userId === userId;
  console.log("Is owner: ", isOwner);

  return (
    <div className="Content">
      <h1 className='PageTitle'>{user.username}</h1>
      <div className="UserInfo">
        <p><strong>Username:</strong> {user.username}</p>
        {isOwner === false ? (
          isFriend ? (
            <Button 
              variant='contained'
              color='error'
              onClick={() => {
            }}>
              Remove Friend
            </Button>
          ) : (
            hasPendingRequest ? (
              <Button 
                variant='outlined'
                disabled='true'
                >
                Pending
              </Button>
            ) : (
              <Button 
                variant='contained'
                onClick={() => {
                sendFriendRequest(userId);
              }}>
                Add Friend
              </Button>
            )
          )
        ) : (
          <></>
        )}
        
        
      </div>

      <h2>{user.username}'s Events</h2>
      {events.length === 0 ? (
        <p>{user.username} has not created any events yet.</p>
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

export default ProfilePage;