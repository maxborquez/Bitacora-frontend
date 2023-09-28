import { useQuery } from "react-query";
import ModalAptitudes from "./ModalAptitudes";
import DatosPersonales from "./datosPersonales";
import MisAptitudes from "./misApitudes";
import { CircularProgress, Grid } from "@mui/material";
import clienteAxios from "../../../../helpers/clienteaxios";


const DataAlumno = ()=>{

    const rut = localStorage.getItem("rut");
    
    const {data,status} = useQuery("datospersonales", async()=>{
        const response = await clienteAxios.post("/alumno/show",{
            rut:rut
        })
        return response.data.alumno
    });

    if(status=="success"){
        return (
            <>
                 <DatosPersonales data={data}/>
              
            </>
        )
    }
    

  
    if(status=="loading"){
        return (
            <Grid sx={{width:"35%",margin:"0px auto",marginTop:"15px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                Cargando datos.........
                <CircularProgress/>
            </Grid>
        )
    }
}

export default DataAlumno;