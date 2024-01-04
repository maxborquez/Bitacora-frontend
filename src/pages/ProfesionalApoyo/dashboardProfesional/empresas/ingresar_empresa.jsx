import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import HeaderProfesional from '../../../../components/headers/headerProfesional';
import SidebarProfesional from '../../../../components/sidebars/sidebarProfesional';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import clienteAxios from "../../../../helpers/clienteaxios";

const IngresarEmpresa = () => {
  const [rutEmpresa, setRutEmpresa] = useState('');
  const [razonSocial, setRazonSocial] = useState('');
  const [direccion, setDireccion] = useState('');
  const [centroPractica, setCentroPractica] = useState('Si');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [comuna, setComuna] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Datos enviados:', {
      rutEmpresa,
      razonSocial,
      direccion,
      centroPractica,
      correo,
      telefono,
      comuna,
    });
  };

  return (
    <Grid container sx={{ height: '100vh', position: 'relative' }}>
      <Grid item xs={12}>
        <HeaderProfesional />
      </Grid>

      <Grid item xs={3} sx={{ position: 'sticky', top: '64px', maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
        <SidebarProfesional />
      </Grid>

      <Grid item xs={9} sx={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px', overflowX: 'hidden' }}>
          <TextField label="Rut Empresa" value={rutEmpresa} onChange={(e) => setRutEmpresa(e.target.value)} fullWidth margin="normal" />
          <TextField label="Razón Social" value={razonSocial} onChange={(e) => setRazonSocial(e.target.value)} fullWidth margin="normal" />
          <TextField label="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} fullWidth margin="normal" />
          <Select label="Centro de Práctica" value={centroPractica} onChange={(e) => setCentroPractica(e.target.value)} fullWidth margin="normal">
            <MenuItem value="Si">Sí</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
          <TextField label="Correo" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} fullWidth margin="normal" />
          <TextField label="Teléfono" type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} fullWidth margin="normal" />
          <TextField label="Comuna" value={comuna} onChange={(e) => setComuna(e.target.value)} fullWidth margin="normal" />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
            Enviar
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default IngresarEmpresa;
