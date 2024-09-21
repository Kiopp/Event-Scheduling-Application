import * as React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

class EventPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            event: {}
        };
    }

    componentDidMount() {
        const { event_id } = useParams();
        axios.get(`/api/events/${event_id}`)
        .then(response => {
            this.setState({event: response.data});
        })
        .catch(error => {
            console.error(error);
        });
    }
    render() {
        const { event } = this.state;
        return (
            <div>
                <h1>{event.title}</h1>
                <p><strong>Date:</strong>{event.date}</p>
                <p><strong>Start Time</strong>{event.startTime}</p>
                <p><strong>End Time</strong>{event.endTime}</p>
                <p><strong>Description</strong>{event.description}</p>
            </div>
        );
    }
}

export default EventPage;