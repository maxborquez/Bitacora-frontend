
import { Alert, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";

import { Delete, Download, Visibility } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useState } from "react";
import FileSaver from "file-saver";
import { useNavigate, useParams } from "react-router-dom";
import clienteAxios from "../../../../../helpers/clienteaxios";


const MostrarArchivos = ()=>{

    const [archivos,setArchivos] = useState([]);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {id} = useParams();
    const id_bitacora = id;
    const getArchivos = useQuery("archivos_bitacora", async()=>{
        const response = await clienteAxios.post(`/archivoalumno/getpdf`,{
            id_bitacora:Number(id_bitacora)
        })
        if(response.status==200){
            if(response.data.archivos){
        
                const pdfsData = response.data.archivos;
                const Urls = pdfsData.map((pdf,index)=>{
                    const pdfData = new Uint8Array(pdf.archivo.data);
                    const pdfBlob = new Blob([pdfData],{type:'application/pdf'});
                    return { blob: pdfBlob, nombre: `${pdf.nombre_archivo}`, id_archivo: pdf.id_archivo };
                })
                setArchivos(Urls)
            }
           
            return response.data;
        }
        
    })
    const downloadPdf = (pdfBlob, pdfName) => {
        FileSaver.saveAs(pdfBlob, pdfName);
    };
    const handleLinkClick = (id) => {
        const newTab = window.open(`/visualizadorbitacora/${id}`, '_blank');
        newTab.focus();
      };

    if(getArchivos.status == "success" && !getArchivos.data.archivos){
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
    if(getArchivos.status == "success" && getArchivos.data.archivos){
        return (
            <Grid sx={{width:"100%",display:"flex", flexDirection:"column"}}>
           
                <TableContainer component={Paper} sx={{width:"70%",margin:"0px auto",marginTop:"10px"}}>
                <Table stickyHeader sx={{ minWidth: 500,maxHeight:300 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>

                        <TableCell>Acciones</TableCell>
                    </TableRow>
                    </TableHead>
             
                <TableBody>
                     {
                        archivos.map((archivo,idx)=>(
                            <TableRow key={idx}>
                           
                                <TableCell>{archivo.nombre}</TableCell>
                              
                                <TableCell>
                                    <Tooltip title="Ver Documento">
                                        <Visibility sx={{cursor:"pointer"}} onClick={()=>{handleLinkClick(archivo.id_archivo)}} />
                                    </Tooltip>
                                    <Tooltip title="Descargar Documento">
                                         <Download sx={{cursor:"pointer"}} onClick={()=>downloadPdf(archivo.blob,archivo.nombre)} />
                                    </Tooltip>
                                   
                                   
                                </TableCell>
                            </TableRow>
                        ))
                     }
                </TableBody>
                </Table>
                </TableContainer>
            </Grid>
        )
    }
    if(getArchivos.status == "loading"){
        return (
        <Grid sx={{width:"35%",margin:"0px auto",marginTop:"20px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            Cargando datos.........
            <CircularProgress/>
        </Grid>
        )
    }

}

export default MostrarArchivos;