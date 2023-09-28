import { Button, Grid, Typography } from "@mui/material";

import HeaderAlumno from "../../components/headers/headerAlumno";
import OfertasPracticas from "./components/OfertaPracticas";
import ComprobarInscripcion from "./components/comprobarInscripcion";

const DashboardAlumno = ()=>{
    
    return(
        <Grid style={{
            width:"100%",
            display:"flex",
            flexDirection:"column"
        }}>
            <HeaderAlumno/>
            <ComprobarInscripcion/>
            <OfertasPracticas/>
        </Grid>
    )
};

export default DashboardAlumno;