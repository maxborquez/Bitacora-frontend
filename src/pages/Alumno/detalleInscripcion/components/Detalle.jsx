import { Card, Grid, Typography ,Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Alert, Tooltip} from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";
import { CheckCircleOutline, Delete, DoNotDisturb, Edit, FileCopy, School, Timer10Outlined, TimerOutlined } from "@mui/icons-material";
import RegistroEvaluador from "./registro_evaluador";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Detalle = ({id})=>{
    const navigate = useNavigate();
    const {data,status} = useQuery("detalleinscripcion", async()=>{
        const response = await clienteAxios.get(`/inscripcion/show/${id}`)
       
        return response.data.inscripcion;
    })
    const formato = (texto)=>{
        return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
    }
    const queryClient = useQueryClient();
    const eliminar_inscripcion = async (id)=>{
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, bórralo!',
            cancelButtonText: "Cancelar"
          }).then(async (result) => {
            if (result.isConfirmed) {
              // La función de callback se ejecutará si el usuario hace clic en "Aceptar"
              //const response = await axios.delete(`${BASE_API}/${id}`);
              const response = await clienteAxios.delete(`/inscripcion/delete/${id}`);
              if (response.status === 200) {
      
                Swal.fire({
                  title: "Eliminado",
                  text: "La Inscripción ha sido eliminada correctamente",
                  icon: "success",
                  confirmButtonText: "Aceptar"
                })
                setTimeout(() => {
                    Swal.close();
                    queryClient.refetchQueries("update_inscripcion")
                    navigate("/alumno");
                }, 2000)
              } else {
                Swal.fire({
                  title: "Error",
                  text: "Ha ocurrido un error al eliminar la Inscripción",
                  icon: "error",
                  confirmButtonText: "Aceptar"
                })
              }
      
            }
          });

    }
    if(status=="success"){
            
        if(data.fecha_inicio && data.fecha_fin ){
            let fecha_inicio = data.fecha_inicio.split("T")[0];
            fecha_inicio = (formato(fecha_inicio))
            let fecha_fin = data.fecha_fin.split("T")[0];
            fecha_fin = formato(fecha_fin)
            return (
                <Grid sx={{marginTop:"15px"}}>
                    <Typography sx={{textAlign:"center",marginTop:"10px",display:"flex",justifyContent:"center",alignItems:"center"}} variant="h6">Detalle Inscripción <School style={{marginLeft:"5px"}}/></Typography>
                    <TableContainer component={Paper} sx={{ maxWidth: '90%',margin:"0px auto",marginTop:"10px", boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)' }}>
                                <Table>
                                <TableHead sx={{ width: "100%", textAlign: "center" }}>
                                <TableRow>
                                <TableCell><strong>Fecha Inicio</strong></TableCell>
                                <TableCell><strong>Fecha Término</strong></TableCell>
                                <TableCell><strong>Observaciones</strong></TableCell>
                                <TableCell><strong>Modalidad</strong></TableCell>
                                <TableCell><strong>Supervisor práctica</strong></TableCell>
                                <TableCell><strong>Nota Empresa</strong></TableCell>
                                <TableCell><strong>Nota Encargado</strong></TableCell>
                                <TableCell><strong>Estado Solicitud</strong></TableCell>
                                <TableCell><strong>Acciones</strong></TableCell>
                                    
                                
                            </TableRow>
                                </TableHead>
                                    <TableBody>
                                    <TableRow>
                                            <TableCell>
                                                {fecha_inicio}
                                            </TableCell>
                                            <TableCell>
                                                {fecha_fin}
                                            </TableCell>
                                            <TableCell>
                                                {data.observaciones== "" ? "----------" : data.observaciones }
                                            </TableCell>
                                            <TableCell>
                                                {data.modalidad.nombre_modalidad}
                                            </TableCell>
                                            <TableCell>
                                                {data.representante == null ? "No registrado" : `${data.representante.nombre} ${data.representante.apellido} `}
                                            </TableCell>
                                            <TableCell>
                                                {data.nota_empresa == 0 ? "-----" : data.nota_empresa }
                                            </TableCell>
                                            <TableCell>
                                                {data.nota_encargado == 0 ? "-----" : data.nota_encargado }
                                            </TableCell>
                                            <TableCell >
                                                {
                                                    data.estado_inscripcion.id_estado_inscripcion == 1 && (
                                                        <TimerOutlined style={{marginRight:"5px"}} />
                                                        
                                                    )
                                                }
                                            {
                                                    data.estado_inscripcion.id_estado_inscripcion == 2 && (
                                                        <CheckCircleOutline style={{marginRight:"5px"}}/>
                                                    )
                                            }
                                                {
                                                    data.estado_inscripcion.id_estado_inscripcion == 3 && (
                                                        <DoNotDisturb style={{marginRight:"5px"}} />
                                                    )
                                                }
                                                {data.estado_inscripcion.nombre_estado_inscripcion}
                                            </TableCell>

                                            <TableCell>
                                                {
                                                    data.estado_inscripcion.id_estado_inscripcion != 2 && (
                                                        <>  
                                                        <Tooltip title="Modificar inscripción" >
                                                            <Edit sx={{cursor:"pointer"}}  onClick={()=>{navigate(`/modificarinscripcion/${id}`)}} />
                                                        </Tooltip>
                                                        <Tooltip title="Documentos">
                                                            <FileCopy sx={{cursor:"pointer"}} onClick = {()=>{navigate(`/documentosinscripcion/${data.id_inscripcion_practica}`)}} />
                                                        </Tooltip>
                                                        <Tooltip title="Eliminar Inscripción">
                                                            <Delete sx={{cursor:"pointer"}} onClick ={()=>eliminar_inscripcion(data.id_inscripcion_practica)} />
                                                        </Tooltip>
                                                        </>
                                                    )
                                                }
                                                
                                                    
                                                    
                                                
                                                
                                                
                                                
                                                
                                            </TableCell>
                                        </TableRow>   
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {
                                data.id_representante == null && (
                                    <Grid sx={{width:"100%"}}>
                                        <Alert severity="warning" sx={{width:"40%",margin:"0px auto",marginTop:"15px"}}>Te falta registrar el Evaluador.</Alert>
                                        <RegistroEvaluador/>
                                    </Grid>
                                )
                            }
                </Grid>
            )

        }
           
        
      
    }
    if(status=="loading"){
        <Grid sx={{width:"35%",margin:"0px auto",marginTop:"20px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            Cargando datos.........
            <CircularProgress/>
        </Grid>
    }
    
   

}
export default Detalle;