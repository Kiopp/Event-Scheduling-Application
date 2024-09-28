import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Avatar, Box, Button, Stack} from '@mui/material';
import Divider from '@mui/material/Divider';
import stringToColor from '../StringToColor.js';

function RequestCard (props) {
    const { name, id } = props;

    return (
        <Link to={`/profile/${id}`}>
            <Card sx={{ maxWidth: 345, display: 'flex', marginBottom: '1rem' }}>
              <CardActionArea>
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                        <Stack direction={"row"} sx={{ display: 'flex', alignItems: 'center' }}>                            
                            <Avatar sx={{marginRight: 2, bgcolor: stringToColor(name)}} >{name[0].toUpperCase()}</Avatar>
                            <Typography variant="h5" sx={{ color: 'text.secondary'}}>
                                {name}
                            </Typography>
                        </Stack>
                        <Divider orientation='vertical' sx={{ p: 1 }}/>
                        <Box>
                            <Link to={`/accept`/* TEMPORARY, SHOULD PERHAPS CALL A FUNCTION INSTEAD */}>
                                <Button>
                                    Accept
                                </Button>
                            </Link>
                            <Link to={`/deny`/* TEMPORARY, SHOULD PERHAPS CALL A FUNCTION INSTEAD */}>
                                <Button>
                                    Deny
                                </Button>
                            </Link>
                        </Box>
                </CardContent>
              </CardActionArea>
            </Card>
        </Link>
      );
}

export default RequestCard;