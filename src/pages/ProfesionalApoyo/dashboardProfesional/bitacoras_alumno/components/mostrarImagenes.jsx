

import { Alert, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useQuery } from "react-query";

import { useState } from "react";
import { Delete, Download } from "@mui/icons-material";
import FileSaver from "file-saver";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../../../../helpers/clienteaxios";



const MostrarImagenes = ({id}) =>{
    const [archivos,setArchivos] = useState([]);
    const id_bitacora = id;
    const navigate = useNavigate();
    const getimagenes = useQuery("imagenes_bitacora_alumno",async()=>{
        const response = await clienteAxios.post(`/archivoalumno/getimagenes`,{
            id_bitacora:Number(id_bitacora)
        }) 
        
        if(response.status==200){
            if(response.data.archivos){
                const imagesData = response.data.archivos;
                const Urls = imagesData.map((image,index)=>{
                    
                    if(image.tipo_archivo == "png" || image.tipo_archivo=="jpg"|| image.tipo_archivo == "PNG" || image.tipo_archivo=="JPG" ){
                        const imageData = new Uint8Array(image.archivo.data);
                        const imageBlob = new Blob([imageData],{type:'image/png'});
                        return { blob: imageBlob, nombre: `${image.nombre_archivo}`, id_archivo: image.id_archivo };
                    }
                    
                })
                const urls = Urls.filter((item)=>item !== undefined)
                setArchivos(urls)
            }
           
            return response.data;
        }
    })
    const downloadPdf = (pdfBlob, pdfName) => {
        FileSaver.saveAs(pdfBlob, pdfName);
    };
    
    const eliminar_archivo = async(id)=>{
        Swal.fire({
            title: '¿Estás seguro si quieres eliminar la imagen?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText:"Cancelar"
        }).then(async(result) =>{
            if(result.isConfirmed){
                const response = await clienteAxios.delete(`/archivoalumno/delete/${id}`);
                if(response.status==200){
                    Swal.fire({
                        title:"Eliminada",
                        text:"La imágen ha sido eliminada correctamente",
                        icon:"success",
                        confirmButtonText:"Aceptar"
                    })
                    setTimeout(()=>{
                        Swal.close();
                        navigate(`/imagenesbitacora/${id_bitacora}`)
                        getimagenes.refetch()
                    },2000)
                   
                }
            }
        });
    }
  
    if(getimagenes.status == "success" && !getimagenes.data.archivos){
        return (
            
            <Grid sx={{width:"100%",display:"flex", flexDirection:"column"}}>

                <TableContainer component={Paper} sx={{width:"90%",margin:"0px auto",marginTop:"10px"}}>
                <Table stickyHeader sx={{ minWidth: 650,maxHeight:300 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                    </TableHead>
                </Table>
                <Alert severity="error"  sx={{margin:"0px auto",marginTop:"10px",marginBottom:"10px",width:"40%",textAlign:"center"}}>No hay archivos registrados</Alert>
                </TableContainer>
            </Grid>
        )
    }
    if(getimagenes.status == "success" && getimagenes.data.archivos){
        return (
            <Grid sx={{width:"100%",display:"flex", flexDirection:"column"}}>
           
                <TableContainer component={Paper} sx={{width:"50%",margin:"0px auto",marginTop:"15px"}}>
                <Table stickyHeader sx={{ minWidth: 500,maxHeight:300 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>

                        <TableCell>Acciones</TableCell>
                    </TableRow>
                    </TableHead>

                <TableBody>
                     {
                        Array.isArray(archivos) && archivos.map((archivo,idx)=>(
                            
                            <TableRow key={idx}>
                           
                                <TableCell>
                                     {archivo.nombre}
                                </TableCell>
                              
                                <TableCell>
                                    <Download sx={{cursor:"pointer"}} onClick={()=>downloadPdf(archivo.blob,archivo.nombre)} />
                                    <Delete sx={{cursor:"pointer"}} onClick={()=>{eliminar_archivo(archivo.id_archivo)}} />
                                </TableCell>
                            </TableRow>
                        ))
                     }
                </TableBody>
                </Table>
                {archivos.length==0 && <Alert severity="error" >No hay registro de imagenes</Alert>}
                </TableContainer>
            </Grid>
        )
    }
    if(getimagenes.status == "loading"){
        return (
            <Grid sx={{width:"35%",margin:"0px auto",marginTop:"20px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            Cargando datos.........
            <CircularProgress/>
            </Grid>
        )
       
        
    }
    

};

export default MostrarImagenes;