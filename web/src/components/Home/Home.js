import React from "react";


import {Box} from "@mui/material";

const Home = () => {
    return (
        <Box sx={{ display: "flex", width: "100%", height: "100%", backgroundColor: "background.main" }}>
            <div style={{ 
                backgroundImage: `url("https://wallpapers.com/images/featured/4k-gaming-33vov45f7zqi6t75.jpg")`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: '100%', 
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',  // Align horizontally to the start (left side)
                alignItems: 'flex-end',        // Align vertically to the end (bottom)
                fontSize: '8em',
                color: '#39FF14',
                fontFamily: 'Times New Roman, sans-serif'
            }}>
            GameStoppr
            </div>
        </Box>
    )
    
}

export default Home;