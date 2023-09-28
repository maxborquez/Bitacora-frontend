import { Grid, Typography } from "@mui/material"
import HeaderAlumno from "../../../components/headers/headerAlumno";
import FormularioModificarInscripcion from "./components/formularioModificarInscripcion";



const ModificarDatos = ()=>{
    
    return (
        <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
            <HeaderAlumno/>
            
            <FormularioModificarInscripcion/>
        </Grid>
    )
}

export default ModificarDatos;