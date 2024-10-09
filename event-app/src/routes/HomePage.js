import * as React from 'react';
import AboutUs from '../components/About';

class HomePage extends React.Component {
    render() {
        return (
            <div className='Content'>
                <h1 className='PageTitle'>
                    Welcome to Event Scheduler PRO!
                </h1>
                <AboutUs />
            </div>
            
        );
    }
}

export default HomePage;