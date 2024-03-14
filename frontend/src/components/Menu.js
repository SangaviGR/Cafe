// Menu.js
import React, { useState, useEffect } from "react";
import { Box, List, ListItemButton, ListItem, ListItemIcon, ListItemText, Collapse, Typography, Card, CardContent, Button } from "@mui/material";
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import InboxIcon from '@mui/icons-material/Inbox';
import ViewStreamRoundedIcon from '@mui/icons-material/ViewStreamRounded';
import SettingsBackupRestoreRoundedIcon from '@mui/icons-material/SettingsBackupRestoreRounded';
import TurnSharpRightRoundedIcon from '@mui/icons-material/TurnSharpRightRounded';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Menu = ({ toggleTheme }) => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [currentOrderOpen, setCurrentOrderOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const toggleCategories = () => {
    setCategoriesOpen(!categoriesOpen);
  };

  const toggleCurrentOrder = () => {
    setCurrentOrderOpen(!currentOrderOpen);
  };

  useEffect(() => {
    if (currentOrderOpen && !orderDetails) {
      // Fetch order details from the backend
      fetchOrderDetails()
        .then((data) => setOrderDetails(data))
        .catch((error) => console.error("Error fetching order details:", error));
    }
  }, [currentOrderOpen, orderDetails]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch("YOUR_BACKEND_URL_HERE");
      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <Box flex={1} mt={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Box position={"fixed"}>
        <List>
          <ListItem disablePadding onClick={toggleCategories}>
            <ListItemButton>
              <ListItemIcon>
                <CategoryRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Categories" />
              {categoriesOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={categoriesOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FiberManualRecordIcon sx={{ color: 'green' }} />
                </ListItemIcon>
                <ListItemText primary="Vegetarian" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <FiberManualRecordIcon sx={{ color: 'green' }} />
                </ListItemIcon>
                <ListItemText primary="Vegan" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <FiberManualRecordIcon sx={{ color: 'green' }} />
                </ListItemIcon>
                <ListItemText primary="Gluten-free" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItem disablePadding onClick={toggleCurrentOrder}>
            <ListItemButton>
              <ListItemIcon>
                <ViewStreamRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Current Order" />
              {currentOrderOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={currentOrderOpen} timeout="auto" unmountOnExit>
            {orderDetails ? (
              <>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">Order Details</Typography>
                    <Typography>User: {orderDetails.user}</Typography>
                    <Typography>Item Count: {orderDetails.itemCount}</Typography>
                    <Typography>Total Price: ${orderDetails.totalPrice}</Typography>
                    <Button variant="contained" color="primary">Checkout</Button>
                  </CardContent>
                </Card>
                <Card variant="outlined" sx={{ mt: 2 }}>
                  <CardContent>
                    <Typography variant="h6">Delivery Time</Typography>
                    <Typography>Estimated delivery in {orderDetails.deliveryTime} minutes</Typography>
                  </CardContent>
                </Card>
                <Card variant="outlined" sx={{ mt: 2 }}>
                  <CardContent>
                    <Typography variant="h6">Pickup Time</Typography>
                    <Typography>Order will be ready for pickup in {orderDetails.pickupTime} minutes</Typography>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Typography>Loading order details...</Typography>
            )}
          </Collapse>
          <ListItem disablePadding onClick={toggleTheme}>
            <ListItemButton>
              <ListItemIcon>
                <SettingsBackupRestoreRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Toggle Theme" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <TurnSharpRightRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Track Order" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Order History" />
            </ListItemButton>
          </ListItem>
          
        </List>
      </Box>
    </Box>
  );
};

export default Menu;
