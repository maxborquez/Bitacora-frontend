import React from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import HeaderAlumno from '../../../components/headers/headerAlumno';
import MostrarImagenes from './components/mostrar_imagenes';
import SubirImagenes from './components/subir_imagenes';
import SidebarAlumno from '../../../components/sidebars/sidebarAlumno';

const ImagenesBitacoras = () => {
    const { id } = useParams();

    return (
        <Grid container sx={{ width: '100%', minHeight: '100vh', flexDirection: 'column' }}>
            {/* Header */}
            <Grid item>
                <HeaderAlumno />
            </Grid>

            {/* Main content area */}
            <Grid item container sx={{ flex: 1 }}>
                {/* Sidebar on the left */}
                <Grid item xs={3}>
                    <SidebarAlumno />
                </Grid>

                {/* SubirImagenes and MostrarImagenes components */}
                <Grid item xs={9} sx={{ paddingLeft: 2 }}>
                    <SubirImagenes id={id} />
                    <MostrarImagenes id={id} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ImagenesBitacoras;

