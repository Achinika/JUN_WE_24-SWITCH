import React, { useState, useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InventoryIcon from '@mui/icons-material/Inventory';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import BadgeIcon from '@mui/icons-material/Badge';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import SWITCHLogo from '../Images/logo-1.png';

const SideBar = () => {
  const [selectedItem, setSelectedItem] = useState('Dashboard');
  const admintype = sessionStorage.getItem("admintype");

  useEffect(() => {
    const storedSelectedItem = window.sessionStorage.getItem('selectedItem');
    if (storedSelectedItem) {
      setSelectedItem(storedSelectedItem);
    }
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    window.sessionStorage.setItem('selectedItem', item);
    window.location.href = `/${item}`;
  };

  const handleLogout = () => {
    sessionStorage.setItem("admin_name", "");
    window.location.href = `/`;

  };

  return (
    <div>
      <Drawer
        anchor="left"
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#1F0219',
            color: '#ffffff',
          },
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100 }}>
          <Avatar
            alt="Company Logo"
            src={SWITCHLogo}
            sx={{ width: 80, height: 80, border: '2px solid yellow' }}
          />
        </Toolbar>
        <List>
          {admintype === 'Employee' && (
            <ListItem
              button
              selected={selectedItem === 'Employee'}
              onClick={() => handleItemClick('Employee')}
              sx={{ '&:hover': { backgroundColor: '#2c3e50' } }}
            >
              <ListItemIcon>
                <BadgeIcon sx={{ color: '#ecf0f1' }} />
              </ListItemIcon>
              <ListItemText primary="Employee" />
            </ListItem>
          )}
          {admintype === 'Business' && (
            <ListItem
              button
              selected={selectedItem === 'BusinessManage'}
              onClick={() => handleItemClick('BusinessManage')}
              sx={{ '&:hover': { backgroundColor: '#2c3e50' } }}
            >
              <ListItemIcon>
                <MenuOpenIcon sx={{ color: '#ecf0f1' }} />
              </ListItemIcon>
              <ListItemText primary="Business Management" />
            </ListItem>
          )}

          {admintype === 'Consultant' && (
            <ListItem
              button
              selected={selectedItem === 'ConsultantManage'}
              onClick={() => handleItemClick('ConsultantManage')}
              sx={{ '&:hover': { backgroundColor: '#2c3e50' } }}
            >
              <ListItemIcon>
                <ConfirmationNumberIcon sx={{ color: '#ecf0f1' }} />
              </ListItemIcon>
              <ListItemText primary="Consultant Management" />
            </ListItem>
          )}

        </List>
        <List sx={{ marginTop: 'auto' }}>
          <ListItem button onClick={handleLogout} sx={{ '&:hover': { backgroundColor: '#2c3e50' } }}>
            <LogoutIcon>
              <InventoryIcon sx={{ color: '#ecf0f1' }} />
            </LogoutIcon>
            <ListItemText primary="Logout" sx={{ paddingLeft: '50px' }} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default SideBar;
