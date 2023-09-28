import React from 'react'
import HeaderJefe from '../../../../components/headers/headerJefe'
import { Grid } from '@mui/material'
import ModificarBitacoraJefe from './ModificarBitacoraJefe'

const EditingBit = () => {

    return (
        <Grid sx={{width: "100%", display:'flex', flexDirection:'column',  minHeight:'100vh'}}>
            <HeaderJefe/>
            <ModificarBitacoraJefe/>
        </Grid>
    )
}

export default EditingBit;