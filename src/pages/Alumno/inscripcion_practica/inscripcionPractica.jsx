import { Grid, Typography } from "@mui/material";
import HeaderAlumno from "../../../components/headers/headerAlumno";
import FormularioInscripcion from "./formularioInscripcion";
import { School } from "@mui/icons-material";



const InscripcionPractica = ()=>{

    return (
        <Grid sx={{width:"100%", display:"flex", flexDirection:"column"}}>
            <HeaderAlumno/>
            <Typography variant="h5" style={{textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center",marginTop:"15px",marginBottom:"15px"}} >Inscripción Práctica Profesional <School style={{marginLeft:"5px"}} /> </Typography>
            
            <FormularioInscripcion/>
        </Grid>
    )
}

export default InscripcionPractica;
