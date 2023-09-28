import { Alert, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import HeaderProfesional from "../../../../components/headers/headerProfesional";
import { useQuery } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";
import FileSaver from "file-saver";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Delete, Download, FileCopyOutlined, Visibility } from "@mui/icons-material";




const VerDocumentosInscripcion = ()=>{
    const {id} = useParams();
    
    const [archivos,setArchivos] = useState([]);
    const getArchivos = useQuery("archivos", async()=>{
        const response = await clienteAxios.post(`/archivoinscripcion/getall`,{
            id_inscripcion:Number(id)
        })
        if(response.status==200){
            if(response.data.archivos){
                const pdfsData = response.data.archivos;
                const Urls = pdfsData.map((pdf,index)=>{
                    const pdfData = new Uint8Array(pdf.archivo.data);
                    const pdfBlob = new Blob([pdfData],{type:'application/pdf'});
                  
                    return { blob: pdfBlob, nombre: `${pdf.nombre}`, id_archivo: pdf.id_archivo };
                })
                setArchivos(Urls)
            }
           
            return response.data;
        }
        
    })
    const handleLinkClick = (id) => {
        const newTab = window.open(`/visualizador/${id}`, '_blank');
        newTab.focus();
      };
    
    
    const downloadPdf = (pdfBlob, pdfName) => {
        FileSaver.saveAs(pdfBlob, pdfName);
        
    };
    
  
    if(getArchivos.status == "success" && !getArchivos.data.archivos){
        return (
            <Grid sx={{width:"100%",display:"flex", flexDirection:"column"}}>

                <HeaderProfesional/>
                <Typography variant="h5" sx={{textAlign:"center",marginTop:"15px"}}>Listado de archivos <FileCopyOutlined/> </Typography>
                <TableContainer component={Paper} sx={{width:"90%",margin:"0px auto",marginTop:"10px"}}>
                <Table stickyHeader sx={{ minWidth: 650,maxHeight:300 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Id archivo</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Tipo</TableCell>
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
                <HeaderProfesional/>
                <Typography variant="h5" sx={{margin:"0px auto",marginTop:"15px",display:"flex",alignItems:"center"}}>Listado de archivos <FileCopyOutlined style={{fontSize:30}}/> </Typography>
                <TableContainer component={Paper} sx={{width:"85%",margin:"0px auto",marginTop:"10px"}}>
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
                                    <Tooltip title="Visualizar Documento">
                                         <Visibility sx={{cursor:"pointer"}}  onClick={()=>{handleLinkClick(archivo.id_archivo)}} />
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
            <Grid sx={{width:"100%",display:"flex", flexDirection:"column"}}>
                <HeaderProfesional/>
                 <Grid sx={{width:"35%",margin:"0px auto",marginTop:"20px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                    Cargando datos.........
                    <CircularProgress/>
                </Grid>
            </Grid>
        )
       
    }
 
}


    
   

export default VerDocumentosInscripcion;