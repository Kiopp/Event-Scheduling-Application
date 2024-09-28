import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Avatar } from '@mui/material';
import stringToColor from '../StringToColor';

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