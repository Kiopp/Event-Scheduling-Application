import React from 'react';
import axios from 'axios';
import { TextField, Button, FormControlLabel, Checkbox, Typography, Container, Grid } from '@mui/material';
import DatePicker from '../components/DatePicker';
import TimePicker from '../components/TimePicker';
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

  validateEventTimes = () => {
    const { startDate, endDate, startTime, endTime } = this.state;

    // Get the current date and time
    const currentDateTime = dayjs();

    // Combine startDate and startTime into a single startDateTime object
    const startDateTime = startDate.set('hour', startTime.hour()).set('minute', startTime.minute());
    // Combine endDate and endTime into a single endDateTime object
    const endDateTime = endDate.set('hour', endTime.hour()).set('minute', endTime.minute());

    // Validation: Start datetime must be in the future
    if (!startDateTime.isAfter(currentDateTime)) {
      return false;
    }

    // Validation: Start datetime must be before end datetime
    if (!endDateTime.isAfter(startDateTime)) {
      return false;
    }

    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // Validate before submission
    if (!this.validateEventTimes()) {
      return; // Stop submission if validation fails
    }

    const { title, singleDay, startDate, endDate, startTime, endTime, description } = this.state;

    // Prepare event data
    const eventData = {
      title,
      singleDay,
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
      startTime: startTime.format('HH:mm'),
      endTime: endTime.format('HH:mm'),
      description,
    };

    // Post data to the backend
    axios.post('http://localhost:5001/api/create-new-event', eventData)
      .then((response) => {
        console.log(response.data);
        console.log(eventData);
        // Redirect to the newly created event page (or show a success message)
        //this.props.history.push(`/events/event/${response.data._id}`);
      })
      .catch((error) => {
        console.error('Error creating event:', error);
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSingleDayToggle = (event) => {
    this.setState({ singleDay: event.target.checked });
  };

  handleStartDayChange = (newValue) => {
    this.setState({ startDate: newValue });
  };

  handleEndDayChange = (newValue) => {
    this.setState({ endDate: newValue });
  };

  handleStartTimeChange = (newValue) => {
    this.setState({ startTime: newValue });
  };

  handleEndTimeChange = (newValue) => {
    this.setState({ endTime: newValue });
  };

  render() {
    const { singleDay, startDate, endDate, startTime, endTime, title, description } = this.state;

    return (
      <div className='Content'>
        <h1 className='PageTitle'>
            Create new event
        </h1>

        <Container maxWidth="sm">
          <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
            <Grid container spacing={3}>
              {/* Title Field */}
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  name="title"s
                  value={title}
                  onChange={this.handleChange}
                  fullWidth
                  required
                />
              </Grid>

              {/* Single Day Checkbox */}
              <Grid item xs={12} key="Checkbox">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={singleDay}
                      onChange={this.handleSingleDayToggle}
                      name="singleDay"
                    />
                  }
                  label="Single Day Event"
                />
              </Grid>

              {/* Start Date Picker */}
              <Grid item xs={12} key="StartDate">
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={this.handleStartDayChange}
                  fullWidth
                />
              </Grid>

              {/* End Date Picker (conditionally rendered) */}
              {!singleDay && (
                <Grid item xs={12} key="EndDate">
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={this.handleEndDayChange}
                    fullWidth
                  />
                </Grid>
              )}

              {/* Start Time Picker */}
              <Grid item xs={12} key="StartTime">
                <TimePicker
                  label="Start Time"
                  value={startTime}
                  onChange={this.handleStartTimeChange}
                  fullWidth
                />
              </Grid>

              {/* End Time Picker */}
              <Grid item xs={12} key="EndTime">
                <TimePicker
                  label="End Time"
                  value={endTime}
                  onChange={this.handleEndTimeChange}
                  fullWidth
                />
              </Grid>

              {/* Description Field */}
              <Grid item xs={12} key="Description">
                <TextField
                  label="Description"
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12} key="Submit">
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Create Event
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </div>
      
    );
  }
}

export default CreateEventPage;