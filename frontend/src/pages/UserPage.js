import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Pagination, Container } from '@mui/material';
import Menu from "../components/Menu";
import NavBar from "../components/NavBar";

const UserPage = ({ toggleTheme }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/api/v1/user?page=${page}`);
        setUsers(response.data.data);
        setTotalPages(Math.ceil(response.data.total / response.data.pagination.limit));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsers();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Add handleUpdate and other necessary functions here

  return (
    <div>
      <NavBar/>
      <Container maxWidth="xl">
        <Menu toggleTheme={toggleTheme} />
        <Grid container spacing={2} ml={48}>
          {users.map((user) => (
            <Grid item key={user._id} xs={12}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Name: {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: {user.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Location: {user.location}
                  </Typography>
                  {/* Add more fields as needed */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      
    </div>
  );
};

export default UserPage;
