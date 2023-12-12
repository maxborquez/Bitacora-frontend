import React from 'react';
import ShowBitaAlumno from './ShowBitaAlumno';
import { Grid } from '@mui/material';
import HeaderAlumno from '../../../../components/headers/headerAlumno';
import SidebarAlumno from '../../../../components/sidebars/sidebarAlumno';

const RenderBitaAlumno = () => {
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

                {/* ShowBitaAlumno on the right */}
                <Grid item xs={9} sx={{ paddingLeft: 2 }}>
                    <ShowBitaAlumno />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default RenderBitaAlumno;
