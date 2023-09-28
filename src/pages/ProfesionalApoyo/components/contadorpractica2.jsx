import { Button, Card, Grid, Typography } from "@mui/material"
import { useQuery } from "react-query"
import clienteAxios from "../../../helpers/clienteaxios"



const Contadorpractica2 = ({anio,periodo_academico})=>{
    const listado_alumnos = useQuery("practica2", async ()=>{
        const response = await clienteAxios.post("/inscripcion/listadopractica2",{
            anio:Number(anio),
            id_periodo:Number(periodo_academico)
        })
        
        if(response.status==200){
            return response.data
        }
    })

    if(listado_alumnos.status=="success"){
        return (
        
            <Grid item lg={5}>
                <Card sx={{paddingTop:"20px",paddingBottom:"40px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                    <Typography variant="h5" sx={{textAlign:"center"}}>Práctica profesional 2</Typography>
                    <Typography variant="h6" sx={{textAlign:"center"}}>Alumnos inscritos: {listado_alumnos.data.cantidad_alumnos} </Typography>
                    <Button variant="contained">Ver situación estudiantes</Button>
                </Card>
            </Grid>
        )
    }
}
export default Contadorpractica2;