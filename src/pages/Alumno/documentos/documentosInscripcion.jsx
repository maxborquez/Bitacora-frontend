import { Grid, Typography } from "@mui/material";
import HeaderAlumno from "../../../components/headers/headerAlumno";
import { useParams } from "react-router-dom";
import MostrarArchivos from "./components/mostrar_archivos";
import SubirArchivo from "./components/subirarchivo";
import SubirConvenios from "./components/subir_convenios";
import SubirInformes from "./components/subir_informes";
import { FileCopyOutlined } from "@mui/icons-material";




const DocumentosInscripcion = ()=>{
    const {id} = useParams();
    
    return (
        <Grid sx={{
            width:"100%",
            display:"flex",
            flexDirection:"column"
        }}>
            <HeaderAlumno/>
            <Typography variant="h5" sx={{textAlign:"center",marginTop:"10px"}}>Documentos <FileCopyOutlined/></Typography>
            <Grid container sx={{width:"100%",display:"flex",marginTop:"15px"}}>
                <SubirConvenios id={id}/>
                <SubirInformes id={id} />
            </Grid>
            
            
            
            <MostrarArchivos id={id}/>
            
        </Grid>
    )
}


export default DocumentosInscripcion;