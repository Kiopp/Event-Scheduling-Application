import React from 'react';
import axios from 'axios';

class CreateEventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      description: '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, date, startTime, endTime, description } = this.state;
    axios.post('/api/events', { title, date, startTime, endTime, description })
      .then((response) => {
        console.log(response);
        this.props.history.push(`/events/event/${response.data.id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <h1>Create New Event</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Date:
            <input type="date" name="date" value={this.state.date} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Start Time:
            <input type="time" name="startTime" value={this.state.startTime} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            End Time:
            <input type="time" name="endTime" value={this.state.endTime} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Description:
            <textarea name="description" value={this.state.description} onChange={this.handleChange} />
          </label>
          <br />
          <button type="submit">Create Event</button>
        </form>
      </div>
    );
  }
}

export default CreateEventPage;