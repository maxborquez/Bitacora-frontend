import React from 'react'
import { Grid } from '@mui/material'
import ModificarBitaAlumno from './ModificarBitaAlumno'
import HeaderAlumno from '../../../../components/headers/headerAlumno'


const EditingBitAlumno = () => {
    
    return (
        <Grid sx={{width: "100%", display:'flex', flexDirection:'column',  minHeight:'100vh'}}>
            <HeaderAlumno/>
            <ModificarBitaAlumno/>
        </Grid>
    )
}

export default EditingBitAlumno;