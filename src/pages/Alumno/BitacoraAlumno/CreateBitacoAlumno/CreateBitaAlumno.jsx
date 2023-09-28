import React, { useState } from 'react';
// import axios from 'axios';
import { TextField, Button, Container, Snackbar, MenuItem, Select, FormControl, InputLabel, Card, Typography } from '@mui/material';


import Swal from 'sweetalert2';

import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import clienteAxios from '../../../../helpers/clienteaxios';
//mutation para enviar los datos del formulario

const CreateBitaAlumno = () => {

  
  console.log()
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha_creacion, setFechaCreacion] = useState('');
  const [hora_inicio, setHoraInicio] = useState('');
  const [hora_fin, setHoraFin] = useState('');
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

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
    // La fecha "1970-01-01" se utiliza como un marcador de tiempo estándar para facilitar la comparación de las horas. 
    // En la mayoría de los sistemas, las fechas se calculan en milisegundos desde la "época de Unix", 
    // que comenzó a las 00:00:00 del 1 de enero de 1970 (UTC). 
    // Por eso, muchas veces se utiliza esta fecha como base cuando solo nos interesa la comparación de horas o minutos.

    const horaInicio = new Date(`1970-01-01T${hora_inicio}:00`);
    const horaFin = new Date(`1970-01-01T${hora_fin}:00`);
    const minTime = new Date("1970-01-01T08:00:00");
    const maxTime = new Date("1970-01-01T22:00:00");

    if (horaInicio < minTime || horaInicio > maxTime) {
      Swal.fire({
        title: "Error",
        text: "La hora de inicio debe estar entre las 08:00 y las 22:00",
        icon: "error",
        confirmButtonText: "Aceptar"
      });
      return;
    }

    if (horaFin < minTime || horaFin > maxTime) {
      Swal.fire({
        title: "Error",
        text: "La hora de finalización debe estar entre las 08:00 y las 22:00",
        icon: "error",
        confirmButtonText: "Aceptar"
      });
      return;
    }

    if (horaInicio.getTime() === horaFin.getTime()) {
      Swal.fire({
        title: "Error",
        text: "La hora de inicio no puede ser igual a la hora de finalización",
        icon: "error",
        confirmButtonText: "Aceptar"
      });
      return;
    } if (horaInicio >= horaFin) {
      Swal.fire({
        title: "Error",
        text: "La hora de inicio debe ser menor que la hora de finalización",
        icon: "error",
        confirmButtonText: "Aceptar"
      });
      return;
    }

    try {
      const id_usuario = localStorage.getItem("id_usuario");
      const id_inscripcion_practica = localStorage.getItem("id_inscripcion_practica")
      const response = await clienteAxios.post('/bitacoralumno/create', {
        titulo,
        descripcion,
        fecha_creacion: fecha_creacion,
        hora_inicio: hora_inicio,
        hora_fin: hora_fin,
        id_estado_bitacora: 2, // Reemplaza con el valor correcto
        id_usuario: Number(id_usuario), // Reemplaza con el valor correcto
        id_inscripcion_practica: id_inscripcion_practica, // Reemplaza con el valor correcto


      });



      if (response.status === 200) {
        Swal.fire({
          title: "Registrada",
          text: "La bitácora ha sido registrada correctamente",
          icon: "success",
          confirmButtonText: "Aceptar"

        })

        setTimeout(() => {
          Swal.close()
          navigate(`/showbitalumno/${id_inscripcion_practica}`)
        }, 1000);

      }
    } catch (error) {
      // console.error(error);
      console.log(error)
      // Realiza acciones en caso de error
    }
  }

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
    <Container maxWidth="sm" sx={{ marginTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '50px' }}>
      <Card sx={{ padding: '20px', backgroundColor: "#f4f5f7" }}>
        <Typography
          component="h2"
          sx={{
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'color 0.3s',
            '&:hover': { color: 'orange' },
            textAlign: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            fontSize: '30px'
          }}
        >

          <SpeakerNotesIcon sx={{ fontSize: '2rem', verticalAlign: 'middle', marginRight: '10px' }} />
          Bitácora Alumno

        </Typography>


        <TextField
          label="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ backgroundColor: "white" }}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            maxLength: 101,
          }}

        />
        <p style={{ color: remainingCharsTitleColor, fontSize: '15px', textAlign: 'center' }}>
          {remainingCharsTitle >= 0 ? `Carácteres restantes: ${remainingCharsTitle}` : 'Has superado el límite de carácteres. Por favor, reduce tu título.'}
        </p>


        <TextField
          label="Fecha de Creación"
          type="date"
          value={fecha_creacion}
          onChange={(e) => setFechaCreacion(e.target.value)}
          fullWidth
          sx={{ backgroundColor: "white" }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />


        <TextField
          label="Hora de Inicio"
          type="time"
          value={hora_inicio}
          sx={{ backgroundColor: "white" }}
          onChange={(e) => setHoraInicio(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: "08:00",
            max: "22:00"
          }}
        />

        <TextField
          label="Hora de Fin"
          type="time"
          value={hora_fin}
          onChange={(e) => setHoraFin(e.target.value)}
          fullWidth
          sx={{ backgroundColor: "white" }}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: "08:00",
            max: "22:00"
          }}
        />



        <TextField
          label="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={10}
          sx={{ backgroundColor: "white" }}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            maxLength: 1001,
          }}

        />
        <p style={{ color: remainingCharsColor, fontSize: '15px', textAlign: 'center' }}>
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

}

export default CreateBitaAlumno;