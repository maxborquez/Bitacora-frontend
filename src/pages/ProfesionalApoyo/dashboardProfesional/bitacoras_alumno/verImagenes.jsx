import { Grid, Typography } from "@mui/material";
import MostrarImagenes from "./components/mostrarImagenes";
import { Image } from "@mui/icons-material";
import HeaderProfesional from "../../../../components/headers/headerProfesional";




const VerImagenes = ()=>{
    
    return (
        <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
            <HeaderProfesional/>
            <Typography variant="h5" sx={{textAlign:"center",display:"flex",justifyContent:"center", alignItems:"center",marginTop:"15px"}}>Listado de Imágenes <Image style={{marginLeft:"5px"}} /> </Typography>
            <MostrarImagenes/>
        </Grid>
    )
}

export default VerImagenes;