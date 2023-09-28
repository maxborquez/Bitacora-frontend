import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import HeaderAlumno from "../../../components/headers/headerAlumno";
import { useQuery } from "react-query";
import clienteAxios from "../../../helpers/clienteaxios";
import MisAptitudes from "../perfil-alumno/components/misApitudes";
import ModalAptitudes from "../perfil-alumno/components/ModalAptitudes";
import { PsychologyAltOutlined, PsychologyAltRounded, PsychologyRounded } from "@mui/icons-material";




const Aptitudes = ()=>{
    const rut = localStorage.getItem("rut");
    const id_alumno = localStorage.getItem("id_alumno")
        return(
            <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
                <HeaderAlumno/>
                <Typography variant="h5" sx={{ color: "black",textAlign:"center", transition: "all 1000ms",marginTop:"30px" }}>
                            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                                <PsychologyAltRounded sx={{ fontSize: "3rem", mr: 2 }} />
                                Aptitudes del Alumno
                                <PsychologyAltRounded sx={{ fontSize: "3rem", ml: 2 }} />
                            </Box>
                </Typography>
                
           
                <ModalAptitudes id_alumno={id_alumno} />
                <MisAptitudes id_alumno={id_alumno} />
            </Grid>
        )
    
    

  
    
}

export default Aptitudes;