import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

const Sidebar = () => {
  return (
    <Drawer variant="permanent">
      <List>
        <ListItem button>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Cafes" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Login" />
        </ListItem>
        {/* Add more items as needed */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
