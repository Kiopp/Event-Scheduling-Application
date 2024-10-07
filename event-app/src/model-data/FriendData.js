import axios from 'axios';
export const handleAddFriendButtonClick = async (targetUserId) => {
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