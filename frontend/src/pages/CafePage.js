import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Grid, Pagination, Button, TextField, Container } from '@mui/material';
import Menu from "../components/Menu";
import NavBar from "../components/NavBar";

const CafePage = ({ toggleTheme }) => {
  const [cafes, setCafes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCafes = async () => {
      try {
        const response = await axios.get(`/api/v1/cafe?page=${page}`);
        setCafes(response.data.data);
        setTotalPages(Math.ceil(response.data.total / response.data.pagination.limit));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCafes();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleUpdate = async (cafeId, updatedCafe) => {
    try {
      await axios.put(`/api/v1/cafe/${cafeId}`, updatedCafe);
      const response = await axios.get(`/api/v1/cafe?page=${page}`);
      setCafes(response.data.data);
    } catch (error) {
      console.error('Error updating cafe:', error);
    }
  };

  return (
    <div>
      <NavBar/>
      <Container maxWidth="xl">
        <Menu toggleTheme={toggleTheme} />
        <Grid container spacing={2} ml={48}>
          {cafes.map((cafe) => (
            <Grid item key={cafe._id} xs={12}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={cafe.imageUrl || 'https://via.placeholder.com/150'}
                  alt={cafe.name}
                />
                <CardContent>
                  {cafe.isEditing ? (
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdate(cafe._id, {
                        name: e.target.name.value,
                        location: e.target.location.value,
                        contact: e.target.contact.value,
                        ratings: e.target.ratings.value,
                      });
                      const updatedCafes = cafes.map((c) =>
                        c._id === cafe._id ? { ...c, isEditing: false } : c
                      );
                      setCafes(updatedCafes);
                    }}>
                      <TextField name="name" label="Name" defaultValue={cafe.name} />
                      <TextField name="location" label="Location" defaultValue={cafe.location} />
                      <TextField name="contact" label="Contact" defaultValue={cafe.contact} />
                      <TextField name="ratings" label="Ratings" defaultValue={cafe.ratings} />
                      <Button type="submit">Save</Button>
                    </form>
                  ) : (
                    <>
                      <Typography gutterBottom variant="h5" component="div">
                        {cafe.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Location: {cafe.location}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Contact: {cafe.contact}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Ratings: {cafe.ratings}
                      </Typography>
                      <Button onClick={() => {
                        const updatedCafes = cafes.map((c) =>
                          c._id === cafe._id ? { ...c, isEditing: true } : c
                        );
                        setCafes(updatedCafes);
                      }}>Edit</Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      
    </div>
  );
};

export default CafePage;
