import React, { useEffect, useState } from 'react';
import RequestCard from './RequestCard';

function RequestList() {
    const [friendRequests, setFriendRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null); // Add state for userId

    useEffect(() => {
        // Fetch the current user session to get the userId
        const fetchUserId = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/session', {
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const sessionData = await response.json();
                setUserId(sessionData.user.userId); // Assume userId is in sessionData.userId
                console.log(sessionData);
            } catch (error) {
                console.error('Error fetching user session:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        if (!userId) return; // Ensure userId is available before fetching friend requests

        // Fetch friend requests using the userId
        const fetchFriendRequests = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/friend-requests/${userId}`, {
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Friend requests data:', data);
                setFriendRequests(data.friendRequests); // Match API response structure
                setLoading(false);
            } catch (error) {
                console.error('Error fetching friend requests:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchFriendRequests();
    }, [userId]); // Run this effect when userId is updated

    // Handle loading state
    if (loading) {
        return <div>Loading friend requests...</div>;
    }

    // Handle error state
    if (error) {
        return <div>Error loading friend requests: {error.message}</div>;
    }

    // Handle no friend requests state
    if (friendRequests.length === 0) {
        return <div>No friend requests.</div>;
    }

    // Render the list of friend requests
    /*return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <ul style={{
                display: 'flex',
                flexDirection: 'column',
                listStyle: 'none',
                padding: 0,
                margin: 0
            }}>
                {friendRequests.map((friend, index) => (
                    <li key={friend.senderId || index} style={{ marginBottom: '1rem' }}>
                        <RequestCard
                            id={friend.senderId}
                            name={friend.username} // Updated to match the API response
                        />
                    </li>
                ))}
            </ul>
        </div>
    );*/
}

export default RequestList;