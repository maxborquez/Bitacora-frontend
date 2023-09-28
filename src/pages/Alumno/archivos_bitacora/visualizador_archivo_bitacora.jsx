import { Grid } from "@mui/material";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import clienteAxios from "../../../helpers/clienteaxios";




const VisualizadorDocumentoBitacora = ()=>{

    const {id} = useParams();

    const getArchivo = useQuery("getArchivo",async()=>{
        const response = await clienteAxios.get(`/archivoalumno/show/${id}`);
        if(response.status==200){
            return response.data.archivo;
        }
    })

    if(getArchivo.status=="success"){
        const pdfData = new Uint8Array(getArchivo.data.archivo.data);
        const pdfBlob = new Blob([pdfData],{type:'application/pdf'});
        const archivo = { blob: pdfBlob, nombre: `${getArchivo.data.nombre}`};
       
        return (
            <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
             
                <iframe
                title="PDF Viewer"
                src={URL.createObjectURL(archivo.blob)}
                style={{width:"100%",height:"100vh"}}
              
                frameBorder="0"
                />
            </Grid>
        )    
    }
    
}


export default VisualizadorDocumentoBitacora;
