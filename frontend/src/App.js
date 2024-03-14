import {BrowserRouter,Route,Routes} from 'react-router-dom';
import React, { useState } from "react";
import { Box, Container, Stack, ThemeProvider, createTheme } from "@mui/material";
import Content from "./components/Content";
import Menu from "./components/Menu";
import NavBar from "./components/NavBar";
import ItemsPage from "./pages/ItemsPage";
import OrderPage from "./pages/OrderPage";
import CafePage from './pages/CafePage';
import UserPage from './pages/UserPage';
import PickupPage from './pages/PickUpPage';
function App() {
  const [theme, setTheme] = useState('light');

  const darkTheme = createTheme({
    palette: {
      mode: theme
    },
    typography: {
      fontFamily: 'Roboto',
      fontWeightLight: 400,
      fontWeightBold: 500,
      fontWeightMedium: 600,
      fontWeightRegular: 500
    }
  });

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <BrowserRouter>
        <Routes>
        <Route path="/item" element={<ItemsPage toggleTheme={toggleTheme} />} />
        <Route path="/cafe" element={<CafePage toggleTheme={toggleTheme}/>} />
        <Route path="/order" element={<OrderPage toggleTheme={toggleTheme}/>} />
        <Route path="/user" element={<UserPage toggleTheme={toggleTheme}/>} />
        <Route path="/pickup" element={<PickupPage toggleTheme={toggleTheme}/>} />
        </Routes>
      </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
