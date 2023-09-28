import React from "react";

import { useQuery } from "react-query";
import { Box, Button, CircularProgress, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate, useParams } from 'react-router-dom';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Swal from 'sweetalert2';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import clienteAxios from "../../../../helpers/clienteaxios";
import { AssignmentReturn, Image } from "@mui/icons-material";
const ShowBitaAlumno = () => {
    const {id} = useParams();
    const id_inscripcion_practica = localStorage.getItem("id_inscripcion_practica")
  
    const {data, status, refetch} = useQuery("bitacoralumno", async () => {
        const response = await clienteAxios.get(`/bitacoralumno/getall/${id}`);
        
        return response.data;
    }, {
        refetchOnWindowFocus: false
    });
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const handleNavigate = (id) => {
        navigate(`/detailsbitacoralumno/${id}`);
    }
//Implementacion para eliminar bitácoras de alumnos

const BitacoraDelete = async (id) => {
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
        const response = await clienteAxios.delete(`/bitacoralumno/delete/${id}`);
        if (response.status === 200) {

          Swal.fire({
            title: "Eliminado",
            text: "La bitácora ha sido eliminada correctamente",
            icon: "success",
            confirmButtonText: "Aceptar"
          })
          setTimeout(() => {
            Swal.close();
            refetch()
            
          }, 2000)
        } else {
          Swal.fire({
            title: "Error",
            text: "Ha ocurrido un error al eliminar la bitácora",
            icon: "error",
            confirmButtonText: "Aceptar"
          })
        }

      }
    });
  }


  const BitacoraEdit = (id) => {
    navigate(`/modificarbitacoralumno/${id}`);
  }
  const formato = (texto) => {
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
  }


  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', margin: '0px auto', marginTop: '300px' }}>
        <Typography variant="h5">Por favor, espera. Cargando datos...</Typography>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'error') {
    return <Typography variant="h5">Error al obtener las bitácoras</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{
     
      marginBottom: '15px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
       // Ocupar al menos toda la altura de la pantalla

    }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // Centrado horizontal
          alignItems: 'center', // Centrado vertical
          color: 'inherit',
          '&:hover': {
            color: 'orange',
            cursor: 'default',
          },
        }}
      >
        
        <Typography variant="h3" style={{fontSize:35,display:"flex",alignItems:"center",marginTop:"30px",marginBottom:"15px"}}>
          Bitácoras del Alumno
          <ContentPasteGoIcon style={{ fontSize: 35}} color="inherit" />
        </Typography>
       
      </Box>
      {!data.bitacoras ? ( <>
        <Typography variant="h5">No hay bitácoras disponibles.</Typography>
        <Button sx={{marginTop:"10px"}} onClick={()=>{navigate("/bitacoralumno")}} variant="contained">Haz click Aquí para crear una bitácora</Button>
        </>
      ) : (
        <>
          <Button variant="contained" onClick={()=>{navigate("/bitacoralumno")}} sx={{marginBottom:"15px"}}>Crear Bitácora</Button>
        <TableContainer sx={{
      // Agrega un borde
          borderRadius: '5px', // Redondea los bordes
          maxHeight: '350px', // Altura máxima
          overflow: 'auto', // Muestra una barra de desplazamiento cuando el contenido sobrepasa la altura máxima
          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)', // Añade sombra
          maxWidth: '75%', // Para centrar horizontalmente
          paddingBottom: '5px',
          // Para centrar horizontalmente
        }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Título</TableCell>
                <TableCell sx={{fontWeight:"bold"}}>Fecha creación</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Estado Bitácora</TableCell>
                <TableCell sx={{ fontWeight: 'bold'}}>Acciones</TableCell>
             

              </TableRow>
            </TableHead>
            <TableBody>
              {data.bitacoras.map((bitacora, idx) => (
                <TableRow key={idx}>
                  <TableCell style={{ wordWrap: 'break-word'}}>{bitacora.titulo}</TableCell>
                  <TableCell>{formato(bitacora.fecha_creacion.split("T")[0])}</TableCell>
                  <TableCell >{bitacora.estado_bitacora.nombre_estado_bitacora}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleNavigate(bitacora.id_bitacora)}>
                      <Tooltip title="Ver detalle bitácora">
                          <VisibilityIcon />
                      </Tooltip>
                    </IconButton>
                    <IconButton onClick={() => BitacoraEdit(bitacora.id_bitacora)}>
                      <Tooltip title="Modificar bitácora">
                        <ModeEditOutlineIcon />
                      </Tooltip>
                    </IconButton>
                    <IconButton onClick={() => BitacoraDelete(bitacora.id_bitacora)}>
                      <Tooltip title="Eliminar bitácora">
                         <DeleteIcon />
                      </Tooltip>
                    </IconButton>
                    <IconButton onClick={() => navigate(`/archivosbitacora/${bitacora.id_bitacora}`) }>
                      <Tooltip title="Archivos bitácora">
                        <AssignmentReturn/>
                      </Tooltip>
                    </IconButton>
                    <IconButton onClick={() => navigate(`/imagenesbitacora/${bitacora.id_bitacora}`) }>
                       <Tooltip title="Imágenes bitácora">
                          <Image/>
                       </Tooltip>
                       
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </>
      )}
    </Container>
  );

}

export default ShowBitaAlumno;