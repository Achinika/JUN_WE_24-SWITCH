import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = () => {
    sessionStorage.setItem('cus_mail', 'empty');
    window.location.href = '/';
  };
  return (
    <AppBar position="static" style={{ backgroundColor: '#40243A' }}>
      <Toolbar>
        <Typography variant="h4" style={{ flexGrow: 1, paddingLeft: '25px', SWITCH: 'bold' }}>
          <Link to="/" style={{ color: '#DBC4D7', textDecoration: 'none' }}>SWITCH</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem',fontWeight: 'bold' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem',fontWeight: 'bold', }}>
          <Link to="/Jobs" style={{ color: '#fff', textDecoration: 'none' }}>Jobs</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem', fontWeight: 'bold',}}>
          <Link to="/Posts" style={{ color: '#fff', textDecoration: 'none' }}>Marketing Post</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem', fontWeight: 'bold', }}>
          <Link to="/Consultant" style={{ color: '#fff', textDecoration: 'none' }}>Chat with Consultants</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem', fontWeight: 'bold', }}>
          <Link to="/Feedback" style={{ color: '#fff', textDecoration: 'none' }}>Feedback</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem', fontWeight: 'bold', }}>
          <Link to="/RideShare" style={{ color: '#fff', textDecoration: 'none' }}>Ride Sharing</Link>
        </Typography> 
        <Typography variant="subtitle1" style={{ marginRight: '1rem', fontWeight: 'bold', }}>
          <Link to="/Links" style={{ color: '#fff', textDecoration: 'none' }}>Users</Link>
        </Typography>
         <Typography variant="subtitle1" style={{ marginRight: '1rem', fontWeight: 'bold', }}>
          <Link to="/LinkedU" style={{ color: '#fff', textDecoration: 'none' }}>Linked Users</Link>
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: '1rem', fontWeight: 'bold', }}>
          <Link  onClick={handleLogout} style={{ color: '#fff', textDecoration: 'none' }}>Log Out</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
