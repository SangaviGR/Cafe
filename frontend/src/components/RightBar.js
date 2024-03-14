import React, { useState } from "react";
import { Box, ImageList, ImageListItem, Typography, Select, MenuItem } from "@mui/material";
import BootcampCard from "./BootcampCard";

const RightBar = ({ bootcamps }) => {
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredBootcamps = filter === "all" ? bootcamps : bootcamps.filter((bootcamp) => bootcamp.category === filter);

  return (
    <Box flex={1} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position={"fixed"}>
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          Photo Gallery
        </Typography>
        <Select value={filter} onChange={handleFilterChange} sx={{ marginTop: 2 }}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="category1">Category 1</MenuItem>
          <MenuItem value="category2">Category 2</MenuItem>
          {/* Add more MenuItem components for other categories */}
        </Select>
        <ImageList sx={{ width: 350, height: 450, marginTop: 2 }} cols={3} rowHeight={164}>
          {filteredBootcamps.map((bootcamp) => (
            <ImageListItem key={bootcamp.img}>
              <img src={bootcamp.img} alt={bootcamp.title} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
        <Box sx={{ marginTop: 2 }}>
          {filteredBootcamps.map((bootcamp) => (
            <BootcampCard key={bootcamp.id} bootcamp={bootcamp} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default RightBar;
