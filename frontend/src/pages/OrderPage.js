import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Pagination, Button, Container, TextField } from '@mui/material';
import Menu from "../components/Menu";
import NavBar from "../components/NavBar";

const OrderPage = ({ toggleTheme }) => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/v1/order?page=${page}`);
        setOrders(response.data.data);
        setTotalPages(Math.ceil(response.data.total / response.data.pagination.limit));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOrders();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleUpdate = async (orderId, updatedOrder) => {
    try {
      await axios.put(`/api/v1/order/${orderId}`, updatedOrder);
      const response = await axios.get(`/api/v1/order?page=${page}`);
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <div>
      <NavBar/>
      <Container maxWidth="xl">
        <Menu toggleTheme={toggleTheme} />
        <Grid container spacing={2} ml={48}>
          {orders.map((order) => (
            <Grid item key={order._id} xs={12}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  {order.isEditing ? (
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdate(order._id, {
                        status: e.target.status.value,
                        type: e.target.type.value,
                        dineIn: e.target.dineIn.checked,
                        // Update other fields as needed
                      });
                      const updatedOrders = orders.map((o) =>
                        o._id === order._id ? { ...o, isEditing: false } : o
                      );
                      setOrders(updatedOrders);
                    }}>
                      <TextField name="status" label="Status" defaultValue={order.status} />
                      <TextField name="type" label="Type" defaultValue={order.type} />
                      <Button type="submit">Save</Button>
                    </form>
                  ) : (
                    <>
                      <Typography gutterBottom variant="h5" component="div">
                        Order Date: {order.orderDate}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Status: {order.status}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Type: {order.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Cost: {order.totalCost}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Dine In: {order.dineIn ? 'Yes' : 'No'}
                      </Typography>
                      <Button onClick={() => {
                        const updatedOrders = orders.map((o) =>
                          o._id === order._id ? { ...o, isEditing: true } : o
                        );
                        setOrders(updatedOrders);
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

export default OrderPage;
