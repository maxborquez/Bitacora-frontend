import { Grid } from "@mui/material";
import HeaderJefe from "../../../components/headers/headerJefe";
import { useParams } from "react-router-dom";
import MostrarArchivos from "./components/mostrar_archivos";
import SubirArchivo from "./components/subirarchvo";




const ArchivosBitacorasJefe = ()=>{
    const {id} = useParams();

    return (
        <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
            <HeaderJefe/>
            <SubirArchivo id={id}/>
            <MostrarArchivos id={id}/>
           
        </Grid>
    )
}

export default ArchivosBitacorasJefe;