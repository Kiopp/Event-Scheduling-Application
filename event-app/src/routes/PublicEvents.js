import * as React from 'react';

import EventCard from '../components/EventCard';

class PublicEvents extends React.Component {
    render() {
        return (
            <div className='Content'>
                <h1 className='PageTitle'>
                    Public events
                </h1>
                <EventCard title='Epic Event' date='12/12/2024' startTime='12:40' endTime='13:40' description='This event will be very epic.' id='1'></EventCard>
                <EventCard title='Christmas Eve 2024' date='24/12/2024' startTime='00:00' endTime='24:00' description='Merry christmas! Yet another year we celebrate christmas!' id='3'></EventCard>
                <p>
                    Work in progress...
                </p>
            </div>
        );
    }
}

export default PublicEvents;