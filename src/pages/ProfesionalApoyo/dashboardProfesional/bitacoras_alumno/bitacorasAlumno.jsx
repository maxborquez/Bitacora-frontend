import { Grid } from "@mui/material";
import HeaderProfesional from "../../../../components/headers/headerProfesional";
import MostrarBitacoras from "./mostrar_bitacoras";



const BitacorasAlumno = () =>{

    return (
        <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
            <HeaderProfesional/>
            <MostrarBitacoras/>
        </Grid>
    )
}


export default BitacorasAlumno;