import React, {useEffect, useState} from "react";
import {Box, Button, styled, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

import game from "../../images/game.png";
import {useDispatch} from "react-redux";
import {login, register} from "../../actions/auth";

const MdInputField = styled('div')({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px"
})

const MdStyledInput = styled('input')({
    fontSize: "15px",
    fontFamily: "Open Sans, sans-serif",
    color: "black",
    border: "1px solid grey",
    padding: "15px",
    backgroundColor: "#f4f4f5",
    borderRadius: "5px",
    '&::placeholder': {
        color: "#0b8017",
        opacity: 1
    }
})

const MdLabel = styled('label')({
    fontFamily: "Open Sans",
    fontSize: "15px",
    marginBottom: "10px",
    color: "black",
    fontWeight: "500"
})

const LinkLikeButton = styled(Button)({
    backgroundColor: "transparent",
    border: "none",
    padding: "0",
    font: "inherit",
    cursor: "pointer",
    color: "blue",
    textTransform: "none",
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "14px",
    '&:hover': {
        textDecoration: "underline",
        backgroundColor: "transparent"
    },
});

const Auth = () => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({username: "", email: "", password: "", confirmPassword: ""});
    const [signUp, setSignUp] = useState(false);

    const [error, setError] = useState("");

    const handleInput = (e) => {
        e.preventDefault();
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        if(localStorage.getItem(("profile"))){
            navigate("/dashboard");
        }
    }, [])

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!signUp){
            dispatch(login(inputs)).then((r) => {
                window.location.reload();
            });
        }
        else{
            if(inputs.confirmPassword === inputs.password){
                dispatch(register(inputs)).then((r) => {
                    window.location.reload();
                });
            }
            else{
                setError("Passwords do not match!")
            }
        }
    }

    return(
        <Box sx={{display: 'flex', justifyContent: "center", alignItems: "center", width: "100%", height: "100%", backgroundColor: "background.main"}}>
            <form style={{display: 'flex', justifyContent: "center", alignItems: "center", width: "100%", height: "100%", backgroundColor: "background.main"}} onSubmit={handleSubmit}>
                <Box sx={{display: "flex", width: "50%", height: "100%", alignItems: "center", justifyContent: "center"}}>
                    <img src={game} alt="games" style={{width: "calc(100% - 60px)", borderRadius: "10px"}}/>
                </Box>
                <Box sx={{display: "flex", width: "50%", height: "100%", alignItems: "center", flexDirection: "column", justifyContent: "center"}}>
                    <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", width: "calc(100% - 60px)", height: !signUp ? "81%" : "calc(100% - 20px)", margin: "0px 30px 20px 30px"}}>
                        <Typography sx={{color: "black", fontSize: "40px", fontFamily: 'Open Sans, sans-serif', fontWeight: "700"}}>
                            {
                                !signUp && (
                                    "Sign In"
                                )
                            }
                            {
                                signUp && (
                                    "Sign Up"
                                )
                            }
                        </Typography>
                        <Typography sx={{color: "grey", fontSize: {md: "11px", lg: "14px"}, fontFamily: 'Open Sans, sans-serif', fontWeight: "500", marginTop: "5px", marginBottom: "20px"}}>
                            Quit your video game addiction and make money at the same time! Log in now to begin earning rewards while you become more productive!
                        </Typography>
                        <MdLabel>Username</MdLabel>
                        <MdInputField>
                            <MdStyledInput name="username" value={inputs.username} onChange={handleInput}/>
                        </MdInputField>
                        {
                            signUp && (
                                <MdLabel>Email</MdLabel>
                            )
                        }
                        {
                            signUp && (
                                <MdInputField>
                                    <MdStyledInput name="email" value={inputs.email} onChange={handleInput}/>
                                </MdInputField>
                            )
                        }
                        <MdLabel>Password</MdLabel>
                        <MdInputField>
                            <MdStyledInput type="password" name="password" value={inputs.password} onChange={handleInput}/>
                        </MdInputField>
                        {
                            signUp && (
                                <MdLabel>Confirm Password</MdLabel>
                            )
                        }
                        {
                            signUp && (
                                <MdInputField>
                                    <MdStyledInput type="password" name="confirmPassword" value={inputs.confirmPassword} onChange={handleInput}/>
                                </MdInputField>
                            )
                        }
                        <Button type="submit" onClick={handleSubmit} sx={{color: "background.main", backgroundColor: "secondary.dark", height: "50px", marginTop: "25px", ":hover": {transition: "0.3s", backgroundColor: "secondary.dark", filter: "brightness(75%)"}}}>
                            {!signUp ? "Log In!" : "Sign Up!"}
                        </Button>
                        <Typography sx={{color: "red", fontSize: "14px", fontFamily: "Open Sans, sans-serif", width: "100%", textAlign: "center", marginTop: "5px"}}>
                            {error}
                        </Typography>
                        <LinkLikeButton onClick={() => {setSignUp(!signUp)}} disableRipple sx={{marginTop: "15px"}}>{!signUp ? "Don't have an account? Sign up here!" : "Already have an account? Sign in here!"}</LinkLikeButton>
                    </Box>
                </Box>
            </form>
        </Box>
    )
}

export default Auth;