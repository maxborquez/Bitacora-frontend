import { Grid, Typography } from "@mui/material";
import HeaderProfesional from "../../../../components/headers/headerProfesional";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";
import ListadoAlumnos from "./components/ListadoAlumnos";





const EstadoPracticas = ()=>{
    const {anio,periodo,asignatura,carrera} = useParams()
    


    return (
        <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
            <HeaderProfesional/>
            
            <ListadoAlumnos anio={anio} periodo={periodo} asignatura={asignatura} carrera={carrera} />
        </Grid>
    )
}


export default EstadoPracticas;