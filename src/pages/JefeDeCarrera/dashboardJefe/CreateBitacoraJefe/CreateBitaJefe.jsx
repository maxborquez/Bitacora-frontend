import React, { useState } from 'react';
// import axios from 'axios';
import { TextField, Button, Container, Snackbar, MenuItem, Select, FormControl, InputLabel, Card, Typography} from '@mui/material';
import Swal from 'sweetalert2';

import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import clienteAxios from '../../../../helpers/clienteaxios';
//mutation para enviar los datos del formulario
const BitacoraForm = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha_creacion, setFechaCreacion] = useState('');
  const [hora_inicio, setHoraInicio] = useState('');
  const [hora_fin, setHoraFin] = useState('');
  const [showError, setShowError] = useState(false);
  const [TipoBitacora, setTipoBitacora] = useState('')


  const navigate = useNavigate();
  const tiposbitacoras = useQuery("tipo bitacoras", async () => {
    const response = await clienteAxios.get('/bitacorajefe/tipobitacoras')
    if (response.status === 200) {
   
      return response.data.tipo_bitacoras

    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(titulo + descripcion + fecha_creacion + hora_inicio + hora_inicio)
    if (titulo == '' || descripcion == '' || fecha_creacion == '' || hora_inicio == '' || hora_fin == '') {

      Swal.fire({
        title: "Error",
        text: "Rellene todos los campos del formulario",
        icon: "error",
        confirmButtonText: "Aceptar"
      })


      setShowError(true);
      return;
    }

    try {
      const id_usuario = localStorage.getItem('id_usuario');
      const response = await clienteAxios.post('/bitacorajefe/create', {
        titulo,
        descripcion,
        fecha_creacion: fecha_creacion,
        hora_inicio: hora_inicio,
        hora_fin: hora_fin,
        id_tipo_bitacora: TipoBitacora, // Reemplaza con el valor correcto
        id_estado_bitacora: 2, // Reemplaza con el valor correcto
        id_usuario: id_usuario, // Reemplaza con el valor correcto
      });
      console.log(response.data);
      // Realiza las acciones necesarias con la respuesta del servidor
      if (response.status === 200) {
        Swal.fire({
          title: "Registrada",
          text: "La bitácora ha sido registrada correctamente",
          icon: "success",
          confirmButtonText: "Aceptar"
        })
        setTimeout(() => {
          Swal.close()
          navigate("/showbitacorajefe")
        }, 1000);

      }

    } catch (error) {
      console.error(error);
      // Realiza acciones en caso de error
    }
  };

  const remainingChars = 1000 - descripcion.length;
  const remainingCharsColor = remainingChars > 200 ? 'green' : remainingChars > 100 ? 'orange' : 'red';


  const remainingCharsTitle = 100 - titulo.length;
  const remainingCharsTitleColor = remainingCharsTitle > 50 ? 'green' : remainingCharsTitle > 25 ? 'orange' : 'red';
  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 1000) {
      setDescripcion(inputValue);
    }
  };

  const handleChangeTitle = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 100) {
      setTitulo(inputValue);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom:'50px' }}>
      <Card sx={{padding:'20px',backgroundColor:"#f4f5f7"}}>
      <Typography
        component="h2"
        sx={{
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'color 0.3s',
          '&:hover': { color: 'orange' },
          textAlign:'center',
          alignSelf:'center',
          justifyContent:'center',
          fontSize:'30px'
        }}
      >

        <SpeakerNotesIcon sx={{ fontSize: '2rem', verticalAlign: 'middle', marginRight: '10px' }} />
        Bitácora Jefe de Carrera

      </Typography>


      <TextField
        label="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        fullWidth
        margin="normal"
        sx={{backgroundColor:"white"}}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          maxLength: 101,
        }}
        
      />
  <p style={{color: remainingCharsTitleColor, fontSize:'15px', textAlign:'center'}}>
      {remainingCharsTitle >= 0 ? `Carácteres restantes: ${remainingCharsTitle}` : 'Has superado el límite de carácteres. Por favor, reduce tu título.'}
    </p>

      {/* <TextField
        label="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={10}
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      /> */}


      <TextField
        label="Fecha de Creación"
        type="date"
        value={fecha_creacion}
        onChange={(e) => setFechaCreacion(e.target.value)}
        fullWidth
        sx={{backgroundColor:"white"}}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />


      <TextField
        label="Hora de Inicio"
        type="time"
        value={hora_inicio}
        onChange={(e) => setHoraInicio(e.target.value)}
        fullWidth
        sx={{backgroundColor:"white"}}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />


      <TextField
        label="Hora de Fin"
        type="time"
        sx={{backgroundColor:"white"}}
        value={hora_fin}
        onChange={(e) => setHoraFin(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />


      {
        tiposbitacoras.status == 'success' &&
        <FormControl variant="outlined" fullWidth margin='normal'>
          <InputLabel htmlFor="bitacora-select">Seleccione tipo bitácora</InputLabel>
          <Select
          sx={{backgroundColor:"white"}}
            value={TipoBitacora}
            onChange={(e) => setTipoBitacora(e.target.value)}
            id="bitacora-select"
            label="Seleccione tipo bitácora"
          >
            {
              tiposbitacoras.data.map((tiposbitacora, idx) => (
                <MenuItem key={idx} value={tiposbitacora.id_tipo_bitacora}>{tiposbitacora.nombre_tipo_bitacora}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      }


      <TextField
        label="Descripción"
        value={descripcion}
        sx={{backgroundColor:"white"}}
        onChange={(e) => setDescripcion(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={10}
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          maxLength: 1001,
        }}
     
      />
      <p style={{color: remainingCharsColor, fontSize:'15px', textAlign:'center'}}>
      {remainingChars >= 0 ? `Carácteres restantes: ${remainingChars}` : 'Has superado el límite de carácteres. Por favor, reduce tu descripción.'}
    </p>



      <Button
        variant="contained"
        type="submit"
        color="primary"
        sx={{ margin: '20px auto', display: 'block', textAlign: 'center' }}
        onClick={handleSubmit}
        disabled={remainingChars === -1 || remainingCharsTitle === -1} // desactiva el botón cuando no quedan caracteres disponibles
      >
        Crear Bitácora
      </Button>
      </Card>
    </Container>
  );
};


export default BitacoraForm;