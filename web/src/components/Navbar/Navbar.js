import React, {useState} from "react";
import {AppBar, Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {logout} from "../../actions/auth";
import {useDispatch} from "react-redux";

const Navbar = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')) ? JSON.parse(localStorage.getItem('profile')) : null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return(
        <AppBar elevation={0} sx={{display: "flex", backgroundColor: "#ECEFF4", alignItems: 'center', flexDirection: "row"}} position="sticky">
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "10px", flexGrow: 2, zIndex: 1000}}>
                <Button onClick={() => {navigate("/")}} color="background" disableRipple>
                    <Typography sx={{ fontSize: {xs: "24px", lg: "36px"}, color: "black", fontWeight: "400", fontFamily: "VT323" }}>
                        Game
                    </Typography>
                    <Typography sx={{ fontSize: {xs: "24px", lg: "36px"}, color: "red", fontWeight: "400", fontFamily: "VT323" }}>
                        Stoppr
                    </Typography>
                </Button>
            </Box>
            <Box sx={{flexGrow: 1,  height: "100%", display: "flex", justifyContent: "flex-end", marginRight: "20px"}}>
                { user && (
                    <Button onClick={() => navigate("/dashboard")} sx={{marginTop: "20px", marginBottom: "20px"}}>
                        DASHBOARD
                    </Button>
                )
                }
                { user && (
                    <Button onClick={() => dispatch(logout()).then((r) => {window.location.reload()})} sx={{marginTop: "20px", marginBottom: "20px"}}>
                        SIGN OUT
                    </Button>
                )
                }
                { !user && (
                    <Button onClick={() => navigate("/auth")} sx={{marginTop: "20px", marginBottom: "20px"}}>
                        SIGN IN
                    </Button>
                )
                }
            </Box>
        </AppBar>
    )
}

export default Navbar;