import React from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

const TourCard = ({ name, location, contact, ratings }) => {
  return (
    <Card sx={{ maxWidth: 600, marginBottom: '20px' }}>
      <CardHeader
        title={name}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://picsum.photos/200"
        alt={name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Location: {location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Contact: {contact}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ratings: {ratings}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Rating name="simple-controlled" value={ratings} readOnly />
      </CardActions>
    </Card>
  );
};

export default TourCard;
