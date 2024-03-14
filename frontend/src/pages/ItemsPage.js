import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Grid, Pagination, Button, TextField, Container, Stack } from '@mui/material';
import Menu from "../components/Menu";
import NavBar from "../components/NavBar";
const ItemsPage = ({ toggleTheme }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`/api/v1/item?page=${page}`);
        setItems(response.data.data);
        setTotalPages(Math.ceil(response.data.total / response.data.pagination.limit));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchItems();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleUpdate = async (itemId, updatedItem) => {
    try {
      await axios.put(`/api/v1/item/${itemId}`, updatedItem);
      const response = await axios.get(`/api/v1/item?page=${page}`);
      setItems(response.data.data);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="xl">
        <Menu toggleTheme={toggleTheme} />
        <Grid container spacing={2} ml={48}>
          {items.map((item) => (
            <Grid item key={item._id} xs={12}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.imageUrl || 'https://via.placeholder.com/150'}
                  alt={item.name}
                />
                <CardContent>
                  {item.isEditing ? (
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdate(item._id, {
                        name: e.target.name.value,
                        description: e.target.description.value,
                        price: e.target.price.value,
                        quantity: e.target.quantity.value,
                        ratings: e.target.ratings.value,
                      });
                      const updatedItems = items.map((i) =>
                        i._id === item._id ? { ...i, isEditing: false } : i
                      );
                      setItems(updatedItems);
                    }}>
                      <TextField name="name" label="Name" defaultValue={item.name} />
                      <TextField name="description" label="Description" defaultValue={item.description} />
                      <TextField name="price" label="Price" defaultValue={item.price} />
                      <TextField name="quantity" label="Quantity" defaultValue={item.quantity} />
                      <TextField name="ratings" label="Ratings" defaultValue={item.ratings} />
                      <Button type="submit">Save</Button>
                    </form>
                  ) : (
                    <>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Description: {item.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: {item.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantity: {item.quantity}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Ratings: {item.ratings}
                      </Typography>
                      <Button onClick={() => {
                        const updatedItems = items.map((i) =>
                          i._id === item._id ? { ...i, isEditing: true } : i
                        );
                        setItems(updatedItems);
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

export default ItemsPage;

