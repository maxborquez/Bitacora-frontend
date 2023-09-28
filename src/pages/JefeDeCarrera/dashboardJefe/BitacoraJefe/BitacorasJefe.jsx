import React from 'react'
import HeaderJefe from '../../../../components/headers/headerJefe'
import { Grid } from '@mui/material'
import BitacoraForm from '../CreateBitacoraJefe/CreateBitaJefe'
const BitacorasJefe = () => {

    return (
        <Grid sx={{width: "100%", display:'flex', flexDirection:'column',  minHeight:'100vh'}}>
            <HeaderJefe/>
            <BitacoraForm/>
        </Grid>
    )
}

export default BitacorasJefe;



