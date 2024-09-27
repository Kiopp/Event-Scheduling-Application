import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Avatar } from '@mui/material';


function stringToColor(string) {
    if (!string) { // Check if string is null
        return '#7fffd4'; // Return standard color
    }
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }

function FriendCard (props) {
    const { name, id } = props;

    return (
        <Link to={`/profile/${id}`}>
            <Card sx={{ maxWidth: 345, display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <CardActionArea>
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{marginRight: 2, bgcolor: stringToColor(name)}} >{name[0].toUpperCase()}</Avatar>
                    <Typography variant="h5" sx={{ color: 'text.secondary'}}>
                        {name}
                    </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
        </Link>
      );
}

export default FriendCard;