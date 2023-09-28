import { Grid } from "@mui/material";
import HeaderProfesional from "../../../../components/headers/headerProfesional";
import MostarAptitudes from "./components/mostrar_aptitudes";
import { useParams } from "react-router-dom";



const AptitudesAlumno = () =>{
    const {id} = useParams();
    return (
        <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
            <HeaderProfesional/>
            <MostarAptitudes id_alumno={id}/>
        </Grid>
    )
}


export default AptitudesAlumno;