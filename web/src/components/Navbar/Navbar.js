import React, {useState} from "react";
import {AppBar, Box, Button, Typography} from "@mui/material";

const Navbar = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')) !== null ? JSON.parse(localStorage.getItem('profile')).user : JSON.parse(localStorage.getItem('profile')));

    return(
        <AppBar elevation={0} sx={{display: "flex", backgroundColor: "background.main", alignItems: 'center', flexDirection: "row"}} position="sticky">
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "10px", flexGrow: 2}}>
                <Button color="background" disableRipple>
                    <Typography sx={{ fontSize: {xs: "24px", lg: "36px"}, color: "secondary.main", fontWeight: "400", fontFamily: "Holtwood One SC, serif" }}>
                        G
                    </Typography>
                </Button>
            </Box>
            <Box sx={{flexGrow: 1,  height: "100%", display: "flex", justifyContent: "flex-end", marginRight: "20px"}}>
                { user && (
                    <Button sx={{marginTop: "20px", marginBottom: "20px"}}>
                        DASHBOARD
                    </Button>
                )
                }
                { user && (
                    <Button sx={{marginTop: "20px", marginBottom: "20px"}}>
                        SIGN OUT
                    </Button>
                )
                }
                { !user && (
                    <Button sx={{marginTop: "20px", marginBottom: "20px"}}>
                        SIGN IN
                    </Button>
                )
                }
            </Box>
        </AppBar>
    )
}

export default Navbar;