import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import clienteAxios from "../../../../../helpers/clienteaxios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";




const FormularioActualizar = ({id_estado,id_inscripcion,setopen})=>{
   
    
    const queryClient = useQueryClient();
    const [estado, setEstado] = useState(id_estado)
    const handleChangeEstado = (event) => {
        setEstado(event.target.value);
    };

   
    
    const onSubmit = async(e)=>{
        e.preventDefault();
       
        const response = await clienteAxios.post("/inscripcion/updatestado",{
            id_estado_inscripcion:estado,id_inscripcion:id_inscripcion
        })
        if(response.status==200){
        
            Swal.fire({
                title:"Actualizada",
                text:"La inscripción ha sido actualizada correctamente",
                icon:"success",
                confirmButtonText:"Aceptar",
                customClass:{
                    container:"sweetalert_container"
                }
            })

            setTimeout(()=>{
                queryClient.refetchQueries("detalleinscripcion")
                Swal.close();
                setopen(false);
            },2000)
        }
    }

    const getEstados = useQuery("estadosinscripcion",async()=>{
        const response = await clienteAxios.get("/estadosinscripcion/getall");
        if(response.status==200){
            return response.data.estados
        }
    })
    if(getEstados.status=="success"){
        return (
            <form onSubmit={onSubmit} style={{width:"100%"}}>
                <Grid container>
                
                    <Grid item lg={12}>
                        <FormControl fullWidth>
                            <InputLabel>Estado de solicitud</InputLabel>
                            <Select label="Estado de solicitud" fullWidth
                                onChange={handleChangeEstado}
                                value={estado}
                                required
                            >
                                {
                                    getEstados.data.map((estado,idx)=>(
                                        <MenuItem key={idx} value={estado.id_estado_inscripcion}>{estado.nombre_estado_inscripcion}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={12} sx={{marginTop:"5px"}}>
                        <Button variant="contained" type="submit" sx={{display:"block",margin:"0px auto"}}>Cambiar estado</Button>
                    </Grid>
                    
                </Grid> 
        </form>
        )
    }
   
}


export default FormularioActualizar;