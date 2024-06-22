import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#40243A' }}>
      <Toolbar>
        <Typography variant="h4" style={{ flexGrow: 1, paddingLeft:'25px',fontWeight: 'bold', }}>
          <Link to="/New" style={{ color: '#DBC4D7', textDecoration: 'none' }}>SWITCH</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem', fontWeight: 'bold', }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem',fontWeight: 'bold', }}>
          <Link to="/Login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
