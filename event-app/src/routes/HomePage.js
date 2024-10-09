import * as React from 'react';
import AboutCard from '../components/AboutCard';
import LatestEvents from '../components/LatestEvents';

class HomePage extends React.Component {
    render() {
        return (
            <div className='Content'>
                <h1 className='PageTitle'>
                    Welcome to Event Scheduler PRO!
                </h1>
                <LatestEvents />
                <AboutCard />
            </div>
            
        );
    }
}

export default HomePage;