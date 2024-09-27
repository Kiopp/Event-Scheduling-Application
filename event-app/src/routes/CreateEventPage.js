import React from 'react';
import axios from 'axios';
import DatePicker from '../components/DatePicker';
import TimePicker from '../components/TimePicker';
import CustomCheckbox from '../components/Checkbox';
import dayjs from 'dayjs';
import './CreateEventPage.css';

class CreateEventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      singleDay: true,
      startDate: dayjs(),
      endDate: dayjs(),
      startTime: dayjs(),
      endTime: dayjs(),
      description: '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, singleDay, startDate, endDate, startTime, endTime, description } = this.state;

    const eventData = {
      title,
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: singleDay ? startDate.format('YYYY-MM-DD') : endDate.format('YYY-MM-DD'),
      startTime: startTime.format('HH:mm'),
      endTime: endTime.format('HH:mm'),
      description,
    };

    axios.post('/api/events', eventData)
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

  handleSingleDayToggle = (event) => {
    this.setState({singleDay: event.target.checked});
  }

  handleStartDayChange = (newValue) => {
    this.setState({ startDate : newValue });
  }

  handleEndDayChange = (newValue) => {
    this.setState({ endDate : newValue });
  }

  handleStartTimeChange = (newValue) => {
    this.setState({ startTime : newValue });
  }

  handleEndTimeChange = (newValue) => {
    this.setState({ endTime : newValue });
  }

  render() {
    const { singleDay, startDate, endDate, startTime, endTime } = this.state;

    return (
      <div className = "create-event-container">
        <h1>Create New Event</h1>
        <form className = "event-form" onSubmit = {this.handleSubmit}>
          <label>
            Title:
            <input
              type = "text"
              name = "title"
              value = {this.state.title}
              onChange = {this.handleChange}
              className = "input-field"
            />
          </label>

          <CustomCheckbox
            checked={singleDay}
            onChange={this.handleSingleDayToggle}
            className = "checkbox"
          />

          <label>Select Start Date:</label>
          <DatePicker
            value = {startDate}
            onChange = {this.handleStartDayChange}
          />

          {!singleDay && (
            <>
              <label>Select End Date:</label>
              <DatePicker
                value = {endDate}
                onChange = {this.handleEndDayChange}
              />
            </>
          )}

          <label>Select Start Time:</label>
          <TimePicker
            value={startTime}
            onChange={this.handleStartTimeChange}
          />

          <label>Select End Time:</label>
          <TimePicker
            value={endTime}
            onChange={this.handleEndTimeChange}
          />

          <label>
            Description:
            <textarea
              name = "description"
              value = {this.state.description}
              onChange = {this.handleChange}
              className = "input-field"
            />
          </label>

          <button type = "submit" className = "submit-button">Create Event</button>

        </form>
      </div>
    );
  }
}

export default CreateEventPage;