import React from "react";
import clienteAxios from "../../../../helpers/clienteaxios";
import { useQuery } from "react-query";
import { Box, CircularProgress, Container, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

const DetailsBitaJefe = () => {
  const { id } = useParams();
  const { data, status, refetch } = useQuery("bitacorajefedetalle", async () => {
    const response = await clienteAxios.get(`/bitacorajefe/show/${id}`);
    // console.log(response.data.bitacora)
    return response.data.bitacora;
  });


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


  if (status === "success") {
    // console.log(data)
    return (
      <Container maxWidth="lg" sx={{ marginTop: '17px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'inherit',
            marginBottom: '25px',
            '&:hover': {
              color: 'orange',
              cursor: 'default',
            },
          }}
        >
          <Typography variant="h3" style={{ fontSize: 30,display:"flex",alignItems:"center"}}>
            Detalles de la bitácora
            <ContentPasteSearchIcon style={{ fontSize: 30 }} color="inherit" />
          </Typography>
         
        </Box>
        <TableContainer sx={{
          marginBottom: '30px',
          // border: '1px solid black', // Agrega un borde
          borderRadius: '5px', // Redondea los bordes
          maxHeight: '500px', // Altura máxima
          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
          overflow: 'auto' // Muestra una barra de desplazamiento cuando el contenido sobrepasa la altura máxima
        }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell>{data.titulo}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Descripción</TableCell>
                <TableCell style={{ wordWrap: 'break-word', maxWidth: '300px' }}>{data?.descripcion}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>{formato(data.fecha_creacion.split('T')[0])}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hora Inicio</TableCell>
                <TableCell>{data.hora_inicio.split('T')[1].split('.000Z')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hora Fin</TableCell>
                <TableCell>{data.hora_fin.split('T')[1].split('.000Z')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Estado</TableCell>
                <TableCell>{data.estado_bitacora.nombre_estado_bitacora}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tipo Bitácora</TableCell>
                <TableCell>{data.tipo_bitacora.nombre_tipo_bitacora}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );


  }

  if (status === 'error') {
    return <Typography variant="h5">Error al obtener las bitácoras</Typography>;
  }

}

export default DetailsBitaJefe;
