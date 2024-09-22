import * as React from 'react';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

class EventCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            date: props.date,
            startTime: props.startTime,
            endTime: props.endTime,
            description: props.description,
            eventId: props.id
        }
    }
    render() {
        return (
            <Link to={`/events/event/${this.state.eventId}`} className='EventLink'>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {this.state.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                         Date: {this.state.date}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                         Time: {this.state.startTime} - {this.state.endTime}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {this.state.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
            </Link>
          );
    }
}

export default EventCard;