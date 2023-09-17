import React, {useEffect, useState} from "react";
import {Box, Button, CircularProgress, Paper, Typography} from "@mui/material";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import StopIcon from '@mui/icons-material/Stop';
import "./Dashboard.css";
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBlockStatus, toggleBlock } from "../../actions/block";

const Dashboard = () => {

    const [blocked, setBlocked] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!localStorage.getItem(("profile"))){
            navigate("/auth");
        }
        dispatch(getBlockStatus()).then((r) => {
            setBlocked(r.blocked);
        })
    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        if(!blocked){
            setLoading(true);
            dispatch(toggleBlock(true)).then((r) => {
                setLoading(false);
                setBlocked(r.blocked)
            });
        }
        else{
            setLoading(true);
            dispatch(toggleBlock(false)).then((r) => {
                setLoading(false);
                setBlocked(r.blocked);
            })
        }
            
    }

    return (
        <Box sx={{ display: "block", flexDirection: "column", width: "100%", height: "100%", backgroundColor: "background.main", overflowY: "auto"}}>
            <Box sx={{ display: "flex", flexShrink: 0, flexDirection: "row", height: "100%", width: {xs: "100%", lg: "100%"}, alignItems: "center", justifyContent: "center" }}>
                <Box sx={{display: {xs: "none", lg: "flex"}, height: "100%", width: "30%", flexDirection: "column"}}>
                    <Paper elevation={4} sx={{display: "flex", width: "calc(100% - 40px)", height: "calc(25% - 30px)", margin: "20px 20px 10px 20px", borderRadius: "10px", backgroundColor: "background.main"}}>
                        <Box sx={{display: "flex", width: "calc(100% - 20px)", height: "calc(100% - 10px)", margin: "auto"}}>

                        </Box>
                    </Paper>
                    <Paper elevation={4} sx={{display: "flex", width: "calc(100% - 40px)", height: "calc(75% - 30px)", margin: "10px 20px 20px 20px", borderRadius: "10px", backgroundColor: "background.main"}}>
                        <Box sx={{display: "flex", width: "calc(100% - 20px)", height: "calc(100% - 10px)", margin: "auto"}}>

                        </Box>
                    </Paper>
                </Box>
                <Box sx={{display: "flex", height: "100%", width: {xs: "100%", lg: "40%"}, flexDirection: "column"}}>
                    <Paper elevation={4} sx={{display: "flex", flexDirection: "column", width: "calc(100% - 10px)", height: "calc(100% - 40px)", margin: "auto", backgroundColor: "background.main", borderRadius: "10px"}}>
                        <Box sx={{ display: "flex", width: "100%", height: "19%", alignItems: "center", justifyContent: "center"}}>
                            <Typography sx={{ fontSize: {xs: "36px", lg: "50px"}, color: "primary.main", fontWeight: "400", fontFamily: "Poppins, sans-serif" }}>
                                GameStoppr
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", width: "100%", height: "65%", justifyContent: "center", alignItems: "center" }}>
                            <Button
                                onClick={handleClick}
                                sx={{
                                    width: {xs: "200px", lg: "285px", xl: "400px"},
                                    height: {xs: "200px", lg: "285px", xl: "400px"},
                                    borderRadius: "50%",
                                    border: "10px solid",
                                    borderColor: blocked ? "secondary.main" : "primary.main",
                                    position: 'relative',
                                }}
                            >
                                {
                                    !loading && !blocked && (
                                        <PowerSettingsNewIcon sx={{ color: "primary.main", height: "45%", width: "45%" }} />
                                    )
                                }
                                {
                                    loading && (
                                        <CircularProgress className="progress" />
                                    )
                                }
                                {
                                    !loading && blocked && (
                                        <StopIcon sx={{ color: "secondary.main", height: "65%", width: "65%" }}/>
                                    )
                                }
                            </Button>
                        </Box>
                        <Box sx={{ display: "flex", width: "100%", height: "16%", alignItems: "center", justifyContent: "center"}}>
                            <Typography sx={{ fontSize: {xs: "16px", lg: "18px"}, color: "primary.main", fontWeight: "700", fontFamily: "Open Sans, sans-serif" }}>
                                Your apps are currently <span style={{ color: blocked ? '#80ff8c' : 'red' }}>{blocked ? "BLOCKED" : "UNBLOCKED"}</span>
                            </Typography>
                        </Box>
                    </Paper>
                </Box>
                <Box sx={{display: {xs: "none", lg: "flex"}, height: "100%", width: "30%", flexDirection: "column"}}>
                    <Paper elevation={4} sx={{display: "flex", width: "calc(100% - 40px)", height: "calc(100% - 40px)", margin: "20px 20px 20px 20px", borderRadius: "10px", backgroundColor: "background.main"}}>
                        <Box sx={{display: "flex", width: "calc(100% - 20px)", height: "calc(100% - 10px)", margin: "auto"}}>

                        </Box>
                    </Paper>
                </Box>
            </Box>
            <Box sx={{display: {xs: "flex", lg: "none"}, flexShrink: 0, flexDirection: "column", height: "100%", width: {xs: "100%", lg: "100%"}, alignItems: "center", justifyContent: "center" }}>
                <Paper elevation={4} sx={{display: "flex", width: "calc(100% - 20px)", height: "calc(25% - 20px)", margin: "10px 10px 10px 10px", borderRadius: "10px", backgroundColor: "background.main"}}>
                    <Box sx={{display: "flex", width: "calc(100% - 20px)", height: "calc(100% - 20px)", margin: "auto"}}>

                    </Box>
                </Paper>
                <Paper elevation={4} sx={{display: "flex", width: "calc(100% - 20px)", height: "calc(75% - 20px)", margin: "10px 10px 10px 10px", borderRadius: "10px", backgroundColor: "background.main"}}>
                    <Box sx={{display: "flex", width: "calc(100% - 20px)", height: "calc(100% - 20px)", margin: "auto"}}>

                    </Box>
                </Paper>
            </Box>
            <Box sx={{display: {xs: "flex", lg: "none"}, flexShrink: 0, flexDirection: "column", height: "100%", width: {xs: "100%", lg: "100%"}, alignItems: "center", justifyContent: "center" }}>
                <Paper elevation={4} sx={{display: "flex", width: "calc(100% - 20px)", height: "calc(100% - 20px)", margin: "10px 10px 10px 10px", borderRadius: "10px", backgroundColor: "background.main"}}>
                    <Box sx={{display: "flex", width: "calc(100% - 20px)", height: "calc(100% - 20px)", margin: "auto"}}>

                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}

export default Dashboard;
