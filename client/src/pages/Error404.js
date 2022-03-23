import React from 'react';
import {
    Box,
    Button,
    Typography,
}from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

const Error404 = () => {
    return(
        <Box margin={10} flexDirection= "column" display="flex" alignItems="center" justifyContent="center">
            <Typography variant='h3'>Error404</Typography><br/>
            <Typography variant='h6'>Page Not Found</Typography>
            <Button size="large" variant="contained" component={RouterLink} to="/">
                Return to Homepage
            </Button>
        </Box>
        
    );
}
export default Error404;