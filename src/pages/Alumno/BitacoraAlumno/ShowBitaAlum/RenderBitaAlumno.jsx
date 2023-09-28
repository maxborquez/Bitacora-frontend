import React from 'react'
import ShowBitaAlumno from './ShowBitaAlumno'

import { Grid } from '@mui/material'
import HeaderAlumno from '../../../../components/headers/headerAlumno'

const RenderBitaAlumno = () => {

    return (
        <Grid sx={{width: "100%", display:'flex', flexDirection:'column',  minHeight:'100vh'}}>
           <HeaderAlumno/>
           <ShowBitaAlumno/>
        </Grid>
    )
}

export default RenderBitaAlumno;