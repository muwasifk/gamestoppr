import React, {useEffect, useState} from "react";
import {Box, styled} from "@mui/material";
import {useNavigate} from "react-router-dom";

const MdInputField = styled('div')({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px"
})

const MdStyledInput = styled('input')({
    fontSize: "15px",
    fontFamily: "Open Sans, sans-serif",
    color: "black",
    border: "1px solid grey",
    padding: "15px",
    backgroundColor: "#fdfdfe",
    borderRadius: "5px",
    '&::placeholder': {
        color: "#9698f6",
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

const Auth = () => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({username: "", email: "", password: "", confirmPassword: ""});

    const handleInput = (e) => {
        e.preventDefault();
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        if(localStorage.getItem(("profile"))){
            navigate("/dashboard");
        }
    }, [])

    return(
        <Box sx={{display: 'flex', justifyContent: "center", alignItems: "center", width: "100%", height: "100%", backgroundColor: "background.main"}}>
            <Box sx={{display: "flex", width: "50%", height: "100%", alignItems: "center", justifyContent: "center"}}>

            </Box>
            <Box sx={{display: "flex", width: "50%", height: "100%", alignItems: "center", flexDirection: "column", justifyContent: "center"}}>
                <MdLabel>Hello</MdLabel>
                <MdInputField>
                    <MdStyledInput/>
                </MdInputField>
            </Box>
        </Box>
    )
}

export default Auth;