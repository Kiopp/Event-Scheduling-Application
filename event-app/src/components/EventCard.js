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
                <Card sx={{ width: 345, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                  <CardActionArea sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CardContent textAlign="center">
                      <Typography variant="h6" sx={{ 
                                  width: 200,
                                  color: 'text.secondary', 
                                  overflow: 'hidden', 
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                              }}>
                              {this.state.title}
                      </Typography>
                      
                      {/* Conditionally render date based on whether it's a single-day event */}
                      {this.state.singleDay ? (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {this.state.startDate}
                        </Typography>
                      ) : (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {this.state.startDate} - {this.state.endDate}
                        </Typography>
                      )}

                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                         {this.state.startTime} - {this.state.endTime}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
            </Link>
        );
    }
}

export default EventCard;