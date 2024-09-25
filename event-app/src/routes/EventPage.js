import React, { Component } from 'react';
import axios from 'axios';

class EventPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        event: null,
      };
    }
  
    componentDidMount() {
        const { match } = this.props;
        const event_id = match.params.event_id;
        axios.get(`/api/events/${event_id}`)
          .then(response => {
            // eslint-disable-next-line react/no-is-mounted
            this.setState({ event: response.data });
          })
          .catch(error => {
            console.error(error);
          });
      }

    render() {
        return (
            <div>
                {this.state.event && (
                    <div>
                        <h1>{this.state.event.title}</h1>
                        <p><strong>Date:</strong>{this.state.event.date}</p>
                        <p><strong>Start Time</strong>{this.state.event.startTime}</p>
                        <p><strong>End Time</strong>{this.state.event.endTime}</p>
                        <p><strong>Description</strong>{this.state.event.description}</p>
                    </div>
                )}
                {!this.state.event && (
                <div>Loading...</div>
                )}
            </div>
        );
    }   
}

export default EventPage;