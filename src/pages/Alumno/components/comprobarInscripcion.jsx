import { Alert, Button, Grid, Typography } from "@mui/material";
import { useQuery } from "react-query";
import clienteAxios from "../../../helpers/clienteaxios";
import { useNavigate } from "react-router-dom";




const ComprobarInscripcion = ()=>{
    
    const id_alumno = localStorage.getItem("id_alumno");
    const id_inscribe = localStorage.getItem("id_inscribe");
    const navigate = useNavigate();
    const {data,status} = useQuery("estado_inscripcion",async()=>{
        const response = await clienteAxios.post("/inscripcion/comprobar",{
            id_alumno:id_alumno
        }) 
        return response.data;
    });

    if(status=="success" && data.inscrito_sistema){
        localStorage.setItem("id_inscripcion_practica",data.id_inscripcion_practica)
        return(
            <Grid container spacing={1} sx={{width:"90%",margin:"0px auto",display:"flex",justifyContent:"center",marginTop:"15px"}}>
               
                <Grid item>
                    <Alert >Práctica inscrita en el sistema</Alert>
                </Grid>
                <Grid sx={{display:"flex"}} item>
                    <Button  sx={{marginLeft:"5px"}} variant="contained" onClick={()=>navigate(`/detalleinscripcion/${id_inscribe}`)} >Ver Inscripción</Button>
                </Grid>
            </Grid>
        )
    }
    if(status=="success" && data.inscrito_sistema==false){
        localStorage.setItem("id_inscripcion_practica","undefined")
        return(
            <Grid container spacing={1} sx={{width:"90%",margin:"0px auto",display:"flex",justifyContent:"center",marginTop:"15px"}}>
                <Grid item>
                     <Alert severity="warning" >No estás inscrito en el sistema</Alert>
                </Grid>
                <Grid item sx={{display:"flex"}}>
                     <Button sx={{marginLeft:"5px"}} variant="contained" onClick={()=>navigate(`/inscripcionpractica/${id_inscribe}`)} >Inscribir aquí</Button>
                </Grid>
                
    
            </Grid>
        )
    }


  
}


export default ComprobarInscripcion;