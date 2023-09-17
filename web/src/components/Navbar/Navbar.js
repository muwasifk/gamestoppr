import React, {useState} from "react";
import {AppBar, Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {logout} from "../../actions/auth";
import {useDispatch} from "react-redux";
import './Navbar.css';
const Navbar = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')) ? JSON.parse(localStorage.getItem('profile')) : null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return(
        <AppBar elevation={0} sx={{display: "flex", backgroundColor: "#ECEFF4", alignItems: 'center', flexDirection: "row"}} position="sticky">
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "10px", flexGrow: 2, zIndex: 1000}}>
                <Button onClick={() => {navigate("/")}} color="background" disableRipple>
                <Typography sx={{fontFamily: 'Abril Fatface', color: "black"}}>
                    Game<span className="highlighted-text-nav">Stoppr</span>
                </Typography>
                </Button>
            </Box>
            <Box sx={{flexGrow: 1,  height: "100%", display: "flex", justifyContent: "flex-end", marginRight: "20px"}}>
                { user && (
                    <Button onClick={() => navigate("/store")} sx={{marginTop: "20px", marginBottom: "20px"}}>
                     Store
                    </Button>
                )
                
                }
                { user && (
                    <Button onClick={() => navigate("/dashboard")} sx={{marginTop: "20px", marginBottom: "20px"}}>
                        Dashboard
                    </Button>
                )
                }
                { user && (
                    <Button onClick={() => dispatch(logout()).then((r) => {window.location.reload()})} sx={{marginTop: "20px", marginBottom: "20px"}}>
                        Sign Out
                    </Button>
                )
                }
                { !user && (
                    <Button onClick={() => navigate("/auth")} sx={{marginTop: "20px", marginBottom: "20px"}}>
                        Sign In 
                    </Button>
                )
                }
            </Box>
        </AppBar>
    )
}

export default Navbar;