import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  styled,
  Badge,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
const NavBar = () => {
  return (
    <AppBar position="sticky">
      {/* <Toolbar variant="dense">
    <Typography variant='h5'>Tours</Typography>
    <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/300" />
    
  </Toolbar> */}
      <StyledToolBar variant="dense">
        <Typography variant="h5">Cafe</Typography>
        <Box sx={{display:'flex',alignItems:"center",gap:'20px'}}>
          <Badge color="error" badgeContent={99}>
            <MailIcon />
          </Badge>
          <Badge color="error" badgeContent={99}>
            <NotificationsActiveIcon/>
          </Badge>
          <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/300" />
        </Box>
      </StyledToolBar>
    </AppBar>
  );
};

export default NavBar;
