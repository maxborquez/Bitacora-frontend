import React from 'react';
import { Grid } from '@mui/material';
import DetailsBitaAlumno from './DetailsBitaAlumno';
import HeaderAlumno from '../../../../components/headers/headerAlumno';
import SidebarAlumno from '../../../../components/sidebars/sidebarAlumno';

const RenderDetailsAlumno = () => {
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

                {/* DetailsBitaAlumno on the right */}
                <Grid item xs={9} sx={{ paddingLeft: 2 }}>
                    <DetailsBitaAlumno />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default RenderDetailsAlumno;
