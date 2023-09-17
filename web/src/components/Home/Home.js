import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { Button, Typography, Box } from '@mui/material';
import './Home.css';

const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')) ? JSON.parse(localStorage.getItem('profile')) : null);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        color: 'black',
      }}
    >
      <Typography variant="h1" sx={{fontFamily: 'Abril Fatface'}}>
        Game<span className="highlighted-text">Stoppr</span> <span className="blinking-cursor" sx={{ ml: 10 }}>█</span>
      </Typography>
      <Box sx={{ mt: 4 }}>
        { !user && (
            <Button onClick={() => navigate("/auth")} variant="contained" color="primary" sx={{ mr: 2 }}>
            Register
            </Button>
        )
        }
        { user && (
            <Button onClick={() => navigate("/auth")} variant="contained" color="primary" sx={{ mr: 2 }}>
            Dashboard
            </Button>
        )
        }
        <Button variant="contained" sx={{backgroundColor: "#ff0000"}}>
          Why us?
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
