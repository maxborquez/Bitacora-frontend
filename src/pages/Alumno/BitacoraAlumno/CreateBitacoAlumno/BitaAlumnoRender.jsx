import React from 'react';
import { Grid } from '@mui/material';
import HeaderAlumno from '../../../../components/headers/headerAlumno';
import CreateBitaAlumno from './CreateBitaAlumno';
import SidebarAlumno from '../../../../components/sidebars/sidebarAlumno';

const BitAlumnoRender = () => {
    return (
        <Grid container sx={{ width: '100%', minHeight: '100vh', flexDirection: 'column' }}>
            {/* Header */}
            <Grid item sx={{ position: 'sticky', top: 0, zIndex: 1000 }}>
                <HeaderAlumno />
            </Grid>

            {/* Main content area */}
            <Grid item container sx={{ flex: 1 }}>
                {/* Sidebar on the left */}
                <Grid item xs={3} sx={{ position: 'sticky', top: 0, zIndex: 1000 }}>
                    <SidebarAlumno />
                </Grid>

                {/* CreateBitaAlumno on the right */}
                <Grid item xs={9} sx={{ paddingLeft: 2 }}>
                    <CreateBitaAlumno />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default BitAlumnoRender;
