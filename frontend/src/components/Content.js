import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import TourCard from './TourCard';

const Content = () => {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/cafe');
        setCafes(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box flex={2} padding={3}>
      {cafes.map(cafe => (
        <TourCard key={cafe._id} name={cafe.name} location={cafe.location} contact={cafe.contact} ratings={cafe.ratings} />
      ))}
    </Box>
  );
};

export default Content;
