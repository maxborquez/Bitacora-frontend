import { Grid } from "@mui/material";
import HeaderProfesional from "../../../../components/headers/headerProfesional";
import DetailsBitaAlumno from "../../../Alumno/BitacoraAlumno/DetailsAlumno/DetailsBitaAlumno";




const DetalleBitacora = () =>{
    return (
        <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
            <HeaderProfesional/>
            <DetailsBitaAlumno/>
        </Grid>
    )
}

export default DetalleBitacora;