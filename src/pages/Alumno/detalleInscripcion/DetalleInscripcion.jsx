import { Grid, Typography } from "@mui/material"
import HeaderAlumno from "../../../components/headers/headerAlumno"
import Detalle from "./components/Detalle";
import { useParams } from "react-router-dom";


const DetalleInscripcion = ()=>{
    const {id} = useParams();
    return (
        <Grid sx={{width:"100%"}}>
            <HeaderAlumno/>
            <Detalle id={id} />
        </Grid>
    )
}

export default DetalleInscripcion;