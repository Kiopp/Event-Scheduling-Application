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
            startDate: props.startDate,
            endDate: props.endDate,
            startTime: props.startTime,
            endTime: props.endTime,
            description: props.description,
            eventId: props.id,
            singleDay: props.singleDay // Add singleDay to the state
        };
    }

    render() {
        return (
            <Link to={`/event/${this.state.eventId}`} className='EventLink'>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {this.state.title}
                      </Typography>
                      
                      {/* Conditionally render date based on whether it's a single-day event */}
                      {this.state.singleDay ? (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Date: {this.state.startDate}
                        </Typography>
                      ) : (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Start Date: {this.state.startDate} - End Date: {this.state.endDate}
                        </Typography>
                      )}

                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                         Time: {this.state.startTime} - {this.state.endTime}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                         Description: {this.state.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
            </Link>
        );
    }
}

export default EventCard;