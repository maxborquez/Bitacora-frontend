import { Grid, Typography } from "@mui/material";
import HeaderProfesional from "../../../../components/headers/headerProfesional";
import MostrarOfertas from "./components/mostrar_ofertas";




const OfertaPractica = ()=>{

    return (
        <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
            <HeaderProfesional/>
             <MostrarOfertas/>
        </Grid>
    )
}

export default OfertaPractica;