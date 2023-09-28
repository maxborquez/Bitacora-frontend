import React from 'react'
import HeaderJefe from '../../../../components/headers/headerJefe'
import { Grid } from '@mui/material'
import DetailsBitaJefe from './DetailsBit'

const DetailsBitacora = () => {

    return (
        <Grid sx={{width: "100%", display:'flex', flexDirection:'column',  minHeight:'100vh'}}>
            <HeaderJefe/>
            <DetailsBitaJefe/>
        </Grid>
    )
}

export default DetailsBitacora;