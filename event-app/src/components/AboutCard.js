import { Typography, Box } from '@mui/material';
import * as React from 'react';

export default function AboutCard() {
    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Box sx={{maxWidth: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 10, padding: '1.75rem', lineHeight: '1.5'}}>
                <Typography variant='h4'>
                    About us
                </Typography>
                <Typography variant='p' sx={{ marginTop: '1rem' }}>
                    Event Scheduler PRO was born out of frustration. As event organizers ourselves, we knew there had to be a better way to manage the chaos. 
                    So, we set out to build a tool that would simplify the entire process, from start to finish. 
                    Today, Event Scheduler PRO empowers individuals and organizations to plan and execute flawless events with ease.  
                    We're passionate about helping you create unforgettable moments. 
                    Whether you're planning apocalyptic preparations or a birthday party for your dog, you can plan and execute any events you can imagine!
                </Typography>
            </Box>
        </Box>
    );
}