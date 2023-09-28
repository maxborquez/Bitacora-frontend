import { Grid } from "@mui/material";
import HeaderAlumno from "../../../components/headers/headerAlumno";


import DataAlumno from "./components/data_alumno";

const PerfilAlumno = ()=>{
    
        return (
            <Grid sx={{
                width:"100%",
                display:"flex",
                flexDirection:"column"
            }}>
                <HeaderAlumno  />
                <DataAlumno/>
            </Grid>
        )
 
    
   
}

export default PerfilAlumno;