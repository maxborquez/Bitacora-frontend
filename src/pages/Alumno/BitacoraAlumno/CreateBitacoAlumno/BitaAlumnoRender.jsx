import React from 'react'

import { Grid } from '@mui/material'
import CreateBitaAlumno from './CreateBitaAlumno'
import HeaderAlumno from '../../../../components/headers/headerAlumno'
import clienteAxios from '../../../../helpers/clienteaxios'


const BitAlumnoRender = () => {

    return (
        <Grid sx={{width: "100%", display:'flex', flexDirection:'column',  minHeight:'100vh'}}>
            <HeaderAlumno/>
            <CreateBitaAlumno />
        </Grid>
    )
}

export default BitAlumnoRender;