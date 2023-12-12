import React from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import HeaderAlumno from '../../../components/headers/headerAlumno';
import MostrarArchivos from './components/mostrar_archivos';
import SubirArchivo from './components/subirarchvo';
import SidebarAlumno from '../../../components/sidebars/sidebarAlumno';

const ArchivosBitacoras = () => {
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

                {/* SubirArchivo and MostrarArchivos components */}
                <Grid item xs={9} sx={{ paddingLeft: 2 }}>
                    <SubirArchivo id={id} />
                    <MostrarArchivos />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ArchivosBitacoras;
