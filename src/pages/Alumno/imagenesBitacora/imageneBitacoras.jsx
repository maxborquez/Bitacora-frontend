import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import HeaderAlumno from "../../../components/headers/headerAlumno";
import MostrarImagenes from "./components/mostrar_imagenes";
import SubirImagenes from "./components/subir_imagenes";



const ImagenesBitacoras = ()=>{
    const {id} = useParams();

    return (
        <Grid sx={{width:"100%", display:"flex", flexDirection:"column"}}>
            <HeaderAlumno/>
            <SubirImagenes id={id}/>
            <MostrarImagenes id={id} />
        </Grid>
    )
}



export default ImagenesBitacoras;