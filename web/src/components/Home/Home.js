import React from "react";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",   // Use viewport width for full width
        height: "100vh",  // Use viewport height for full height
        backgroundImage: `url("https://wallpapers.com/images/featured/4k-gaming-33vov45f7zqi6t75.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        color: "#39FF14",
      }}
    >
      <Typography variant="h1" style={{ fontFamily: "Vast Shadow", fontSize: "3em" }}>
        GameStoppr
      </Typography>
    </Box>
  );
};

export default Home;
