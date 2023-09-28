import { Grid, Typography } from "@mui/material";
import React from "react";
import Header from "../../components/headers/header";
import FormularioLogin from "../../components/logincomponents/formularioLogin";

const Login = ()=>{
    localStorage.clear();
    return(
        <Grid
            sx={{width:"100%"}}
        >
            <Header/>     
            <FormularioLogin/>

        </Grid>
    );
};

export default Login;