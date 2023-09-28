import { CircularProgress, Grid, Typography,Box ,Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Tooltip, Alert} from "@mui/material"
import { useQuery } from "react-query";

import PsychologyAltRoundedIcon from '@mui/icons-material/PsychologyAltRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import clienteAxios from "../../../../../helpers/clienteaxios";


const MostarAptitudes = ({id_alumno}) =>{
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true)

    const getApitudes = async()=>{
        const response = await clienteAxios.post("/alumno/showAptitudes",{
            id_alumno:id_alumno
        });
        if(response.status==200){
            setData(response.data);
            setLoading(!loading);
        }
    }
    useEffect(()=>{
        getApitudes()
    },[])
    if(!loading && data.aptitudes ){
        return (
            <Grid>
                  <Box sx={{ display: 'flex', flexDirection: 'column',alignItems:"center", minHeight: '100vh' }}>
                        <Typography variant="h4" component="h1" gutterBottom sx={{ color: "black", transition: "all 1000ms",marginTop:"30px", ':hover': { color: "orange" } }}>
                            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                                <PsychologyAltRoundedIcon sx={{ fontSize: "3rem", mr: 2 }} />
                                <strong>Listado de aptitudes</strong>
                                <PsychologyAltRoundedIcon sx={{ fontSize: "3rem", ml: 2 }} />
                            </Box>
                        </Typography>
                   
                    <TableContainer component={Paper} sx={{ maxWidth: '80%', boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)' }}>
                        <Table>
                            <TableHead sx={{ width: "100%", textAlign: "center" }}>
                                <TableRow>
                                    <TableCell colSpan={2}>
                                    <Typography variant="subtitle1" sx={{textAlign:"center", color: "black", transition: "all 1000ms", ':hover': { color: "black" } }}>Listado de aptitudes</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.aptitudes.map((conocimiento, index) => (
                                    <TableRow key={index}>
                                        <TableCell >
                                            <Typography variant="body1" sx={{ color: "black", transition: "all 1000ms" }}>
                                                {conocimiento.aptitud.nombre_aptitud}
                                            </Typography>
                                        </TableCell>
                                       
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
             
            </Grid>
        )
    }
    if(!loading && !data.aptitudes){
     
        return (
            <Grid sx={{width:"80%",display:"flex",justifyContent:"center",margin:"0px auto",marginTop:"20px"}}>
                <TableContainer component={Paper} sx={{ maxWidth: '80%', boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)' }}>
                        <Table>
                            <TableHead sx={{ width: "100%", textAlign: "center" }}>
                                <TableRow>
                                    <TableCell colSpan={2}>
                                    <Typography variant="subtitle1" sx={{textAlign:"center", color: "black", transition: "all 1000ms", ':hover': { color: "black" } }}><strong>Listado de aptitudes</strong></Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                        
                        </Table>
                        <Alert severity="error">No tiene aptitudes asociadas</Alert>
                    </TableContainer>
        
                
            </Grid>
        )
    }
    if(loading){
        return (
            <Grid sx={{width:"40%",margin:"0px auto",marginTop:"20px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                Cargando datos.........
                <CircularProgress/>
            </Grid>
        )
    }
}


export default MostarAptitudes;