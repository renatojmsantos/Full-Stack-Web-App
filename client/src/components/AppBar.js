import * as React from 'react';

import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Container,
    Button,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const pages = ['orders', 'items','stock','users',];

const TopBar = () => {

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Button size="large" variant="text" component={RouterLink} to="/">
            <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, color:'#FFFFFF', display: { xs: 'flex', md: 'flex' } }}
            >            
            PRODSMART
            </Typography>
          </Button>
         
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                component={RouterLink} to={"/"+page}
                key={page}
                sx={{ marginLeft: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TopBar;