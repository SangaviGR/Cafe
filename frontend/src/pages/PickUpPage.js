import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Pagination, Button, Container, TextField } from '@mui/material';
import Menu from "../components/Menu";
import NavBar from "../components/NavBar";

const PickupPage = ({ toggleTheme }) => {
  const [pickups, setPickups] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPickups = async () => {
      try {
        const response = await axios.get(`/api/v1/pickup?page=${page}`);
        setPickups(response.data.data);
        setTotalPages(Math.ceil(response.data.total / response.data.pagination.limit));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPickups();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleUpdate = async (pickupId, updatedPickup) => {
    try {
      await axios.put(`/api/v1/pickup/${pickupId}`, updatedPickup);
      const response = await axios.get(`/api/v1/pickup?page=${page}`);
      setPickups(response.data.data);
    } catch (error) {
      console.error('Error updating pickup:', error);
    }
  };

  return (
    <div>
      <NavBar/>
      <Container maxWidth="xl">
        <Menu toggleTheme={toggleTheme} />
        <Grid container spacing={2} ml={48}>
          {pickups.map((pickup) => (
            <Grid item key={pickup._id} xs={12}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  {pickup.isEditing ? (
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdate(pickup._id, {
                        pickupDate: e.target.pickupDate.value,
                      });
                      const updatedPickups = pickups.map((p) =>
                        p._id === pickup._id ? { ...p, isEditing: false } : p
                      );
                      setPickups(updatedPickups);
                    }}>
                      <TextField
                        name="pickupDate"
                        label="Pickup Date"
                        type="datetime-local"
                        defaultValue={new Date(pickup.pickupDate).toISOString().slice(0, 16)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <Button type="submit">Save</Button>
                    </form>
                  ) : (
                    <>
                      <Typography gutterBottom variant="h5" component="div">
                        Pickup Date: {new Date(pickup.pickupDate).toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Status: {pickup.status}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Type: {pickup.type}
                      </Typography>
                      <Button onClick={() => {
                        const updatedPickups = pickups.map((p) =>
                          p._id === pickup._id ? { ...p, isEditing: true } : p
                        );
                        setPickups(updatedPickups);
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

export default PickupPage;
