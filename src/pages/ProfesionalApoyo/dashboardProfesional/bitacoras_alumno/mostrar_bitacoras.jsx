import {AssignmentReturn, ContentPasteGo, Image, Visibility } from "@mui/icons-material";
import { Box, Button, CircularProgress, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import clienteAxios from "../../../../helpers/clienteaxios";



const MostrarBitacoras = ()=>{
    const {id} = useParams();

    
    
    const {data, status, refetch} = useQuery("bitacoralumno", async () => {
        const response = await clienteAxios.get(`/bitacoralumno/getall/${id}`);
        return response.data;
    }, {
        refetchOnWindowFocus: false
    });
    const navigate = useNavigate();


    const handleNavigate = (id) => {
        navigate(`/detallebitacora/${id}`);
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
      maxHeight: '100vh',
      marginBottom: '15px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh', // Ocupar al menos toda la altura de la pantalla

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
          
          <ContentPasteGo style={{ fontSize: 35}} color="inherit" />
        </Typography>
       
      </Box>
      {!data.bitacoras ? ( <>
        <Typography variant="h5">No hay bitácoras disponibles.</Typography>
        
        </>
      ) : (
        <>
          
        <TableContainer sx={{
      // Agrega un borde
          borderRadius: '5px', // Redondea los bordes
          maxHeight: '400px', // Altura máxima
          overflow: 'auto', // Muestra una barra de desplazamiento cuando el contenido sobrepasa la altura máxima
          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)', // Añade sombra
          maxWidth: '70%', // Para centrar horizontalmente
          paddingBottom: '5px',
          // Para centrar horizontalmente
        }}>
            
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', width: '33%', height: '50px' }}>Título</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '33%', height: '50px' }}>Estado Bitacora</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '33%', height: '50px' }}>Acciones</TableCell>
             

              </TableRow>
            </TableHead>
            <TableBody>
              {data.bitacoras.map((bitacora, idx) => (
                <TableRow key={idx}>
                  <TableCell style={{ width: '33%', height: '50px' , wordWrap: 'break-word', maxWidth: '300px' }}>{bitacora.titulo}</TableCell>
                  <TableCell style={{ width: '33%', height: '50px' }}>{bitacora.estado_bitacora.nombre_estado_bitacora}</TableCell>
                  <TableCell style={{ width: '33%', height: '50px' }}>
                    <IconButton onClick={() => handleNavigate(bitacora.id_bitacora)}>
                      <Tooltip title="Ver detalle bitácora">
                          <Visibility />
                      </Tooltip>
                    </IconButton>
                    <IconButton onClick={() => navigate(`/verarchivobitacoras/${bitacora.id_bitacora}`) }>
                      <Tooltip title="Archivos bitácora">
                        <AssignmentReturn/>
                      </Tooltip>
                    </IconButton>
                    <IconButton onClick={() => navigate(`/verimagenesbitacoras/${bitacora.id_bitacora}`) }>
                      <Tooltip title="Imagénes bitácora">
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


export default MostrarBitacoras;