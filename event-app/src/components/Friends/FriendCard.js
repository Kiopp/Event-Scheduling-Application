import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Avatar, Box, Stack} from '@mui/material';
import stringToColor from '../StringToColor.js';

function FriendCard (props) {
    const { name, id } = props;

    return (
      <Box sx={{width: 345}}>
          <Link to={`/profile/${id}`}>
              <Card sx={{ width: 345, display: 'flex', marginBottom: '1rem' }}>
                  <CardActionArea>
                      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                          <Stack direction={"row"} sx={{ display: 'flex', alignItems: 'center'}}>                            
                              <Avatar sx={{marginRight: 2, bgcolor: stringToColor(name)}} >{name[0].toUpperCase()}</Avatar>
                              <Typography variant="h6" sx={{ 
                                  width: 200,
                                  color: 'text.secondary', 
                                  overflow: 'hidden', 
                                  textOverflow: 'ellipsis', 
                                  whiteSpace: 'nowrap'
                              }}>
                                  {name}
                              </Typography>
                          </Stack>
                      </CardContent>
                  </CardActionArea>
              </Card>
          </Link>
      </Box>
      );
}

export default FriendCard;