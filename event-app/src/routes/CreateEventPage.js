import React from 'react';
import axios from 'axios';
import { TextField, Button, FormControlLabel, Checkbox, Container, Grid } from '@mui/material';
import DateTimePicker from '../components/DateTimePicker';
import TimePicker from '../components/TimePicker';
import CustomSnackbar from '../components/CustomSnackbar';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import './CreateEventPage.css';
import DatePicker from '../components/DatePicker';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  }

  return ComponentWithRouterProp;
}

class CreateEventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      singleDay: true,
      fullDay: false,  // Full Day checkbox state
      startDateTime: dayjs(),
      endDateTime: dayjs(),
      endTime: dayjs(),
      description: '',
      snackbarOpen: false,
      snackbarMessage: '',
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5001/api/session', { withCredentials: true })
      .then(response => {
        // eslint-disable-next-line
        this.setState({ user: response.data.user });
      })
      .catch(error => {
        // eslint-disable-next-line
        this.setState({ errorMessage: 'Please log in to create an event.' });
        this.props.navigate(`/login`);
      });
  }

  validateEventTimes = () => {
    const { fullDay, startDateTime, endDateTime } = this.state;
    
    const currentDateTime = dayjs().startOf('minute');  // Ignoring seconds
    const currentDate = dayjs().startOf('day');  // Only considering the date for full-day events
    
    if (fullDay) {
      // For full-day events, allow creation even if the current date is selected
      if (!startDateTime.isSameOrAfter(currentDate)) {
        this.setState({ 
          snackbarOpen: true, 
          snackbarMessage: 'Start date cannot be before today.' 
        });
        return false;
      }
    } else {
      // Normal validation for non-full-day events
      if (!startDateTime.isSameOrAfter(currentDateTime)) {
        this.setState({ 
          snackbarOpen: true, 
          snackbarMessage: 'Start date and time cannot be in the past.' 
        });
        return false;
      }
  
      if (!endDateTime.isSameOrAfter(startDateTime)) {
        this.setState({ 
          snackbarOpen: true, 
          snackbarMessage: 'End date and time cannot be before the start date and time.' 
        });
        return false;
      }
    }
    
    return true;
  };
  
  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.validateEventTimes()) {
      return;
    }

    const { title, singleDay, fullDay, startDateTime, endDateTime, description } = this.state;

    const eventData = {
      title,
      singleDay,
      fullDay,
      startDate: startDateTime.format('YYYY-MM-DD'),
      endDate: endDateTime.format('YYYY-MM-DD'),
      startTime: startDateTime.format('HH:mm'),
      endTime: endDateTime.format('HH:mm'),
      description,
    };

    axios.post('http://localhost:5001/api/create-new-event', eventData, { withCredentials: true })
      .then((response) => {
        this.props.navigate(`/event/${response.data.eventId}`);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          this.setState({ errorMessage: 'Please log in to create an event.' });
        }
      });
  };

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSingleDayToggle = (event) => {
    this.setState({ 
      singleDay: event.target.checked,
      // Reset full day if single day is unchecked
      fullDay: event.target.checked ? this.state.fullDay : false 
    });
  };

  handleFullDayToggle = (event) => {
    if (event.target.checked) {
      const startOfDay = this.state.startDateTime.startOf('day');
      this.setState({
        fullDay: true,
        startDateTime: startOfDay,
        endDateTime: startOfDay.endOf('day'), // Set end time to 23:59
      });
    } else {
      this.setState({ fullDay: false });
    }
  };

  handleStartDateTimeChange = (newValue) => {
    this.setState({
      startDateTime: newValue,
      // Automatically sync end date to start date if single-day event and not full day
      endDateTime: this.state.singleDay && !this.state.fullDay ? newValue : this.state.endDateTime,
    });
  };

  handleEndDateTimeChange = (newValue) => {
    this.setState({ endDateTime: newValue });
  };

  handleEndTimeChange = (newValue) => {
    const { startDateTime } = this.state;
    this.setState({
      endDateTime: startDateTime.set('hour', newValue.hour()).set('minute', newValue.minute()),
    });
  };

  render() {
    const { singleDay, fullDay, startDateTime, endDateTime, title, description, snackbarOpen, snackbarMessage } = this.state;
  
    return (
      <div className='Content'>
        <h1 className='PageTitle'>Create new event</h1>
  
        <Container maxWidth="sm">
          <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
            <Grid container spacing={3}>
              {/* Title Field */}
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  name="title"
                  value={title}
                  onChange={this.handleChange}
                  fullWidth
                  required
                />
              </Grid>
  
              {/* Checkboxes centralized */}
              <Grid item xs={12} container justifyContent="center">
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
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={fullDay}
                      onChange={this.handleFullDayToggle}
                      name="fullDay"
                      disabled={!singleDay} // Disable Full Day checkbox if Single Day is unchecked
                    />
                  }
                  label="Full Day Event"
                />
              </Grid>

              {/* Date and Time Pickers */}
              {singleDay && !fullDay ? (
                // Single Day Event but NOT Full Day: Show one DateTimePicker and one TimePicker
                <Grid item xs={12} container justifyContent="center" spacing={2}>
                  <Grid item>
                    <DateTimePicker
                      label="Start Date and Time"
                      value={startDateTime}
                      onChange={this.handleStartDateTimeChange}
                    />
                  </Grid>
                  <Grid item>
                    <TimePicker
                      label="End Time"
                      value={endDateTime}
                      onChange={this.handleEndTimeChange}
                    />
                  </Grid>
                </Grid>
              ) : singleDay && fullDay ? (
                // Single Day and Full Day: Show one DatePicker for the start date
                <Grid item xs={12} container justifyContent="center">
                  <Grid item>
                    <DatePicker
                      value={startDateTime}
                      onChange={this.handleStartDateTimeChange}
                    />
                  </Grid>
                </Grid>
              ) : (
                // Multi-day Event: Show two DateTimePickers for start and end dates
                <Grid item xs={12} container justifyContent="center" spacing={2}>
                  <Grid item>
                    <DateTimePicker
                      label="Start Date and Time"
                      value={startDateTime}
                      onChange={this.handleStartDateTimeChange}
                    />
                  </Grid>
                  <Grid item>
                    <DateTimePicker
                      label="End Date and Time"
                      value={endDateTime}
                      onChange={this.handleEndDateTimeChange}
                    />
                  </Grid>
                </Grid>
              )}
  
              {/* Description Field */}
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Create Event
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
  
        {/* Snackbar for error messages */}
        <CustomSnackbar
          open={snackbarOpen}
          onClose={this.handleSnackbarClose}
          message={snackbarMessage}
        />
      </div>
    );
  }  
}

export default withRouter(CreateEventPage);