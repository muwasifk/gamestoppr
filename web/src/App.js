import React from "react";

import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";

import {Box, createTheme, ThemeProvider} from "@mui/material";

import "./App.css";

const palette = createTheme({
    palette: {
        primary: {
            light: '#171717',
            main: '#171717',
            dark: '#171717'
        },
        secondary: {
            light: '#a9f5b1',
            main: '#80ff8c',
            dark: '#0b8017'
        },
        background: {
            light: '#f4f4f5',
            main: '#f4f4f5',
            dark: '#f4f4f5'
        },
    },
});


const App = () => {
    return(
        <ThemeProvider theme={palette}>
            <BrowserRouter>
                <Box sx={{display: "flex", width: "100vw", height: "100vh", flexDirection: "column", backgroundColor: "background.main"}}>
                    <Box sx={{display: "flex", width: "100%", height: "10%"}}>
                        <Navbar/>
                    </Box>
                    <Box sx={{display: "flex", width: "100%", height: "90%", overflowY: "auto"}}>
                        <Routes>
                            <Route path="*" element={<Home/>}/>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                            <Route path="/auth" element={<Auth/>}/>
                        </Routes>
                    </Box>
                </Box>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App;
