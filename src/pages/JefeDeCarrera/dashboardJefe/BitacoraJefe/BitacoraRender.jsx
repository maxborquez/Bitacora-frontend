import React from 'react'
import ShowBitaJefe from './ShowBitaJefe'
import HeaderJefe from '../../../../components/headers/headerJefe'
import { Grid } from '@mui/material'

const BitacoraRender = () => {

    return (
        <Grid sx={{width: "100%", display:'flex', flexDirection:'column',  minHeight:'100vh'}}>
            <HeaderJefe/>
            <ShowBitaJefe />
        </Grid>
    )
}

export default BitacoraRender;