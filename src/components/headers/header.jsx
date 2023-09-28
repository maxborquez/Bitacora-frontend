
import React from "react";
import { Grid, Typography } from "@mui/material";
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logoubb from "../../assets/logoubb.png"

const Header = ()=>{
   

      
    return(
        <Grid container sx={{width:"100%",display:"flex",backgroundColor:"#326FA6",height:"80px",justifyContent:"center", alignItems:"center"}}>
             <img style={{width:"130px"}} src={logoubb} />
             
        
        </Grid>
    )
};

export default Header;
