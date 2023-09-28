
import React from "react";
import { Grid, Typography } from "@mui/material";
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import logoubb from "../../assets/logoubb.png"
import { Output } from "@mui/icons-material";
import Swal from "sweetalert2";

const HeaderJefe = ()=>{
    const location = useLocation().pathname;

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleToggleMenu = () => {
        setOpen(!open);
      };
    const logout = ()=>{
        setOpen(false)
        Swal.fire(
            'Cerrando sesión',
            'redireccionando...',
            'success'
          )
        setTimeout(()=>{
            Swal.close();
         
            navigate("/");
        },2000)
    }
      
    return(
        <Grid container sx={{width:"100%",display:"flex",backgroundColor:"#326FA6",height:"80px", alignItems:"center"}}>
             <Grid sx={{width:"10%",display:"flex",justifyContent:"center"}}>
                
                 <IconButton onClick={handleToggleMenu} sx={{marginLeft:"10px"}}>
                    <MenuIcon style={{color:"white"}} />
                </IconButton>  
                
                
             </Grid>
             <Grid sx={{width:"70%",marginLeft:"45px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                      <img style={{width:"130px"}} src={logoubb} />
            </Grid>
            <Drawer anchor="left" open={open}  width={300} onClose={handleToggleMenu}>
                <List sx={{width:"300px",backgroundColor:"#326FA6",color:"white",height:"100vh" ,display:"flex",flexDirection:"column",alignItems:"center"}} >
                    <ListItem button onClick={handleToggleMenu}>
                    <IconButton  onClick={handleToggleMenu}>
                        <MenuIcon  style={{color:"white"}} />
                    </IconButton>
                    </ListItem>
                    <ListItem button onClick={()=>navigate("/jefedecarrera")}>
                        <ListItemText sx={{textAlign:"center"}} primary="Inicio" />
                    </ListItem>
                    <ListItem button onClick={logout} >
                         <ListItemText  sx={{textAlign:"center",display:"flex",flexWrap:"nowrap",justifyContent:"center",alignItems:"center"}}>
                               <p> Cerrar Sesión</p> <Output/>
                         </ListItemText>
                        
                    </ListItem>
                </List>
            </Drawer>
        </Grid>
    )
};

export default HeaderJefe;
