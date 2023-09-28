import { Grid, Typography } from "@mui/material";
import HeaderAlumno from "../../../components/headers/headerAlumno";
import MostrarArchivos from "./components/mostrar_archivos";
import SubirArchivo from "./components/subirarchvo";
import { useParams } from "react-router-dom";



const ArchivosBitacoras = ()=>{

    const {id} = useParams();
    return (
        <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
            <HeaderAlumno/>
            <SubirArchivo id={id} />
            <MostrarArchivos/>
        </Grid>
    )
}

export default ArchivosBitacoras;