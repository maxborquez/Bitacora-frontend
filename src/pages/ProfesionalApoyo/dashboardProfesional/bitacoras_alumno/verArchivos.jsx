import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import MostrarArchivos from "./components/mostrar_archivos";

import { FileCopy } from "@mui/icons-material";
import HeaderProfesional from "../../../../components/headers/headerProfesional";



const VerArchivos = ()=>{
    const {id} = useParams();
    return (
        <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
            <HeaderProfesional/>
            <Typography variant="h5" sx={{textAlign:"center",marginTop:"15px"}}>Listado de Archivos <FileCopy/> </Typography>
            <MostrarArchivos  />
        </Grid>
    )
}


export default VerArchivos;