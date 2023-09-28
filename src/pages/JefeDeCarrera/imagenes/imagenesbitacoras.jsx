import { Grid } from "@mui/material";

import HeaderJefe  from "../../../components/headers/headerJefe";
import { useParams } from "react-router-dom";
import MostrarImagenes from "./components/mostrar_imagenes";
import SubirImagenes from "./components/subir_imagenes";





const ImagenesBitacorasJefe = () =>{
    const {id} = useParams();
    return (
        <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
            <HeaderJefe/>
            <SubirImagenes id={id}/>
            <MostrarImagenes id={id} />
        </Grid>
    )
}

export default ImagenesBitacorasJefe;