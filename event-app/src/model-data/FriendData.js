import axios from 'axios';
export const sendFriendRequest = async (targetUserId) => {
    try {
      // Make POST request to backend
      axios.post(`http://localhost:5001/api/friend-request/${targetUserId}`, { withCredentials: true })
        .then((response) => {
          // Update UI to notify the user of success! 
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            console.error('Friend request failed:', error.response);
          }
        });
    } catch (error) {
      // Check if the response contains a message
      if (error.response && error.response.data) {
          console.error('Friend request failed:', error.response.data.message);
      } else {
          console.error('Friend request failed:', error);
      }
    }
  };

  export const getUserFriends = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/friends`, {
        credentials: 'include'
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Friends data:', data); // Log the data received from /api/friends
  
      // Assuming /api/friends now returns an array of { _id, username }
      const friendsWithUsernames = data.map(friend => ({
        id: friend._id, 
        username: friend.username
      }));
      
      return friendsWithUsernames;
  
    } catch (error) {
      console.error('Error fetching friends:', error);
      return error; 
    }
  };