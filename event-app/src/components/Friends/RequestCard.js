import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Avatar, Button, Stack} from '@mui/material';
import Divider from '@mui/material/Divider';
import stringToColor from '../StringToColor.js';

function RequestCard (props) {
    const { name, id } = props;

    return (
        <Card sx={{ width: 425, display: 'flex', marginBottom: '1rem' }}>
            <Link to={`/profile/${id}`} sx={{width: '100%'}}>
                <CardActionArea>
                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                            <Stack direction={"row"} sx={{ display: 'flex', alignItems: 'center' }}>                            
                                <Avatar sx={{marginRight: 2, bgcolor: stringToColor(name)}} >{name[0].toUpperCase()}</Avatar>
                                <Typography variant="h6" sx={{ 
                                    width: 175,
                                    color: 'text.secondary', 
                                    overflow: 'hidden', 
                                    textOverflow: 'ellipsis', 
                                    whiteSpace: 'nowrap'
                                }}>
                                    {name}
                                </Typography>
                            </Stack>
                            <Divider orientation='vertical' sx={{ p: 1 }}/>
                            <Stack direction="row" sx={{p: 1, width: 150}}>
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
                            </Stack>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
      );
}

export default RequestCard;