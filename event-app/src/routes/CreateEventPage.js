import React from 'react';
import axios from 'axios';
import { TextField, Button, FormControlLabel, Checkbox, Container, Stack, Box, Typography } from '@mui/material';
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
      singleDay: false,
      fullDay: false,
      startDateTime: dayjs(),
      endDateTime: dayjs(),
      endTime: dayjs(),
      description: '',
      privateEvent: false,
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
    const { fullDay, startDateTime, endDateTime, singleDay } = this.state;
    const currentDateTime = dayjs().startOf('minute');
    const currentDate = dayjs().startOf('day');
  
    if (fullDay) {
      if (!startDateTime.isSameOrAfter(currentDate)) {
        this.setState({ snackbarOpen: true, snackbarMessage: 'Start date cannot be before today.' });
        return false;
      }
    } else {
      if (!startDateTime.isSameOrAfter(currentDateTime)) {
        this.setState({ snackbarOpen: true, snackbarMessage: 'Start date and time cannot be in the past.' });
        return false;
      }
      if (!endDateTime.isSameOrAfter(startDateTime)) {
        this.setState({ snackbarOpen: true, snackbarMessage: 'End date and time cannot be before the start date and time.' });
        return false;
      }
      if (!singleDay && !endDateTime.isAfter(startDateTime.add(1, 'day'))) {
        this.setState({ snackbarOpen: true, snackbarMessage: 'Multi-day events must cover more than one day.' });
        return false;
      }
    }
    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
  
    const { title, startDateTime, endDateTime, description } = this.state;
  
    if (!title || !startDateTime || !endDateTime || !description) {
      this.setState({ snackbarOpen: true, snackbarMessage: 'All fields need to be filled.' });
      return;
    }
  
    if (!this.validateEventTimes()) {
      return;
    }
  
    const { singleDay, fullDay, privateEvent } = this.state;
  
    const eventData = {
      title,
      privateEvent,
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
      fullDay: event.target.checked ? this.state.fullDay : false 
    });
  };

  handleFullDayToggle = (event) => {
    if (event.target.checked) {
      const startOfDay = this.state.startDateTime.startOf('day');
      this.setState({
        fullDay: true,
        startDateTime: startOfDay,
        endDateTime: startOfDay.endOf('day'),
      });
    } else {
      this.setState({ fullDay: false });
    }
  };

  handlePrivateToggle = (event) => {
    this.setState({ privateEvent: event.target.checked });
  };

  handleStartDateTimeChange = (newValue) => {
    this.setState({
      startDateTime: newValue,
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
    const { singleDay, fullDay, startDateTime, endDateTime, title, description, snackbarOpen, snackbarMessage, privateEvent } = this.state; // Updated variable name
  
    return (
      <div className='Content'>
        <h1 className='PageTitle'>Create new event</h1>
  
        <Container maxWidth="sm">
          <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
            <Stack direction="column" spacing={3}>
              {/* Title Field */}
              <TextField
                  label="Title"
                  name="title"
                  value={title}
                  onChange={this.handleChange}
                  fullWidth
                  required
              />

              {/* Checkboxes */} 
              <Stack direction="row" spacing={5} sx={{justifyContent: 'center'}}>
                  <FormControlLabel
                    control={
                        <Checkbox
                            checked={singleDay}
                            onChange={this.handleSingleDayToggle}
                            name="singleDay"
                        />
                    }
                    label="Single day"
                  />
                  <FormControlLabel
                    control={
                        <Checkbox
                            checked={fullDay}
                            onChange={this.handleFullDayToggle}
                            name="fullDay"
                            disabled={!singleDay}
                        />
                    }
                    label="Full day"
                  />
                  <FormControlLabel
                    control={
                        <Checkbox
                            checked={privateEvent}
                            onChange={this.handlePrivateToggle}
                            name="privateEvent"
                        />
                    }
                    label="Private"
                  />
              </Stack>

              {/* Date and Time Pickers */}
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                  {singleDay && !fullDay ? (
                    <Stack direction="column" spacing={2} sx={{width: '50%'}}>
                        <Typography variant='p'>
                          Start Date and Time
                        </Typography>
                        <DateTimePicker
                            label="Start Date and Time"
                            value={startDateTime}
                            onChange={this.handleStartDateTimeChange}
                        />
                        <Typography variant='p'>
                          End Time
                        </Typography>
                        <TimePicker
                            label="End Time"
                            value={endDateTime}
                            onChange={this.handleEndTimeChange}
                        />
                    </Stack>
                  ) : singleDay && fullDay ? (
                    <Stack direction="column" spacing={2} sx={{width: '50%'}}>
                        <DatePicker
                            value={startDateTime}
                            onChange={this.handleStartDateTimeChange}
                        />
                    </Stack>
                  ) : (
                    <Stack direction="column" spacing={2} sx={{width: '50%'}}>
                        <Typography variant='p'>
                          Start Date and Time
                        </Typography>
                        <DateTimePicker
                            label="Start Date and Time"
                            value={startDateTime}
                            onChange={this.handleStartDateTimeChange}
                        />
                        <Typography variant='p'>
                          End Date and Time
                        </Typography>
                        <DateTimePicker
                            label="End Date and Time"
                            value={endDateTime}
                            onChange={this.handleEndDateTimeChange}
                        />
                    </Stack>
                  )}
              </Box>

              {/* Description Field */}
              <TextField
                  label="Description"
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                  multiline
                  rows={4}
                  fullWidth
                  required
              />

              {/* Submit Button */}
              <Button type="submit" variant="contained" color="primary" fullWidth>
                  Create Event
              </Button>

            </Stack>
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