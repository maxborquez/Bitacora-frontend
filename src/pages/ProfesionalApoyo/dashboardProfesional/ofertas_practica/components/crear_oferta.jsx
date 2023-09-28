import { Grid, Typography } from "@mui/material";
import HeaderProfesional from "../../../../../components/headers/headerProfesional";
import FormularioIngresar from "./FormularioIngresar";
import { Work } from "@mui/icons-material";



const CrearOferta = ()=>{

    return(
        <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
            <HeaderProfesional/>
            <Typography variant="h6" sx={{textAlign:"center",display:"flex",justifyContent:"center",alignContent:"center",marginTop:"10px",marginBottom:"10px"}}>
                Crear Oferta Práctica Profesional <Work style={{marginTop:"2px",marginLeft:"5px"}}/>
            </Typography>
            <FormularioIngresar/>
        </Grid>
    )
}


export default CrearOferta;