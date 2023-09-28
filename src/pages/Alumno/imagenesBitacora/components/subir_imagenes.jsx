import { Alert, Box, Button, Card, Grid, Input, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../../../helpers/clienteaxios";
import { PhotoSizeSelectActual } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";

const SubirImagenes = ({id})=>{

    const id_bitacora = id;
    const [open, setOpen] = useState(false);
    const [archivo,setArchivo] = useState(null);
    const [extension,setExtension] = useState(null)
    const [isPdf, setPdf] = useState(true)
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const onSubmit = async(e)=>{

        e.preventDefault();

        const formData = new FormData();


        formData.append("tipo_archivo",extension);
        formData.append("id_bitacora",Number(id))
        formData.append("archivo",archivo)


        const response = await clienteAxios.post("/archivoalumno/create",formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
        
        if(response.status==200){
            Swal.fire({
                title:"Registrada",
                text:"La imagen ha sido registrada correctamente",
                icon:"success",
                confirmButtonText:"Aceptar"
                

            })
            setTimeout(()=>{
                Swal.close();
                navigate(`/imagenesbitacora/${id_bitacora}`);
                setOpen(false);
                queryClient.refetchQueries("imagenes_bitacora_alumno");
            },2000)
        }

    }

    const handleArchivoSeleccionado = (e)=>{
        
        if(e.target.files[0].size <= 1000000){
            
            if(e.target.files[0].name.includes(".png") || e.target.files[0].name.includes(".PNG") ||  e.target.files[0].name.includes(".jpg") || e.target.files[0].name.includes(".JPG") ){
                setPdf(false);
               
                setArchivo(e.target.files[0]);
                setExtension(e.target.files[0].name.split(".")[1])
            }else{
                    setPdf(true);
                    Swal.fire({
                        title:"Error",
                        text:"El tipo de imagen no es el formato señalado.",
                        icon:"error",
                        confirmButtonText:"Aceptar"
                    })
                    
            
            }
        }else{
            setPdf(true);
            Swal.fire({
                title:"Error",
                text:"Has pasado el límite de tamaño permitido",
                icon:"error",
                confirmButtonText:"Aceptar"
            })
            setTimeout(()=>{
            },2000)
        }
        
        
        
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
      };
    return (
        <>
        <Grid sx={{display:"flex",margin:"0px auto",flexDirection:"column", marginTop:"15px"}}>
            <Typography variant="h5" sx={{display:"flex",alignItems:"center"}} >Listado de imágenes <PhotoSizeSelectActual style={{fontSize:30,marginLeft:"5px"}}/> </Typography>
            <Button variant="contained" sx={{marginBottom:"10px",marginTop:"10px"}} onClick={handleOpen}  >Subir Imagen</Button>
        </Grid>
       
            <Modal sx={{zIndex:2}} open={open}  onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: "75%",
                        bgcolor: 'background.paper',
                        maxHeight: '80vh',
                        boxShadow: 24,
                        overflow:"auto",
                        p: 4,
                        }}
                >
                    <form action="" onSubmit={onSubmit} style={{width:"90%",margin:"0px auto",display:"flex",flexDirection:"column"}}>
              
                        <Typography variant="h5" sx={{textAlign:"center",marginTop:"5px",marginBottom:"10px"}}>Subir Imágen</Typography>
                
                            <Grid container sx={{width:"90%",display:"flex",margin:"0px auto",justifyContent:"center"}} >
                                <Grid item xs={11} xl={7} lg={10} md={6} sm={10} >
                                    <TextField required type="file" onChange={handleArchivoSeleccionado}
                                    fullWidth />
                                    <Alert sx={{marginTop:"5px"}} severity="info">Por favor subir imágenes (png , jpg), Tamaño máximo 1MB.</Alert>    
                                </Grid>
                                
                                <Grid item xs={11} xl={7} lg={10} md={6} sm={10} sx={{marginTop:"10px"}}>
                                    <Button disabled={isPdf} sx={{display:"block",margin:"0px auto"}} type="submit" variant="contained">Enviar Imagen</Button>
                                </Grid>
                            </Grid>
                       
                        </form>
                    </Box>
            </Modal>
        </>
    )
}

export default SubirImagenes;