import React, { useState, useEffect } from 'react';
import { TextField, Grid, Box } from '@mui/material';
import FriendCard from './Friends/FriendCard';

function UserList() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUser, setFilteredUser] = useState([]);
    const [user, setUser] = useState([]);
    const [tempFilteredUser, setTempFilteredUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/users', { credentials: 'include' });
                const data = await response.json();
                setUser(data);
                setTempFilteredUser(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        const searchFilteredUser = tempFilteredUser.filter((user) =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUser(searchFilteredUser);
    }, [searchQuery, tempFilteredUser]);

    if (loading) return <div>Loading users...</div>;
    if (error) return <div>Error fetching users: {error.message}</div>;

    return (
        <div>
            {/* Search Input */}
            <Box display="flex" justifyContent="space-between" mb={3}>
                <TextField
                    label="Search by Username"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    fullWidth
                    style={{ marginRight: '16px' }}
                />
            </Box>

            {/* Display users */}
            <Grid container spacing={1} justifyContent="center">
                {filteredUser.map((user) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} key={user._id}>
                        <FriendCard
                            name={user.username}
                            id={user._id}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default UserList;