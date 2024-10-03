import React from 'react';
import RequestCard from './RequestCard';

function RequestList() {
    const friends = [
        { id: 1, username: 'Billy Bob' },
        { id: 3, username: 'Ingvar Kamprad' },
        { id: 4, username: 'REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE' },
        { id: 7, username: 'E' },
        { id: 7, username: 'Jesper Wentzell' },
        // ... more friends
      ];

  return (
    <div style={{ 
      width: '80%'
    }}>
        <ul style={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        flexDirection: 'column',
        listStyle: 'none', 
        padding: 0, 
        margin: 0
      }}>
        {friends.map(friend => (
          <li key={friend.id} style={{ marginRight: '1rem' }}>
            <RequestCard id={friend.id} name={friend.username} /> 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RequestList;