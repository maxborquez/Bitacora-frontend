import { Grid,Button, Box,TextField,Typography, Modal, MenuItem, InputLabel, Alert } from "@mui/material";
import Select from "@mui/material/Select"

import { useState } from "react";
import FormularioRegistro from "./formulario_registro";
import TableEmpresa from "../../../../components/tableEmpresas/tableEmpresa"
import HeaderProfesional from "../../../../components/headers/headerProfesional";

const Empresas = ()=>{
 
    return (
        <Grid
            sx={{
                width:"100%",
                display:"flex",
                flexDirection:"column"
            }}
        > 
            <HeaderProfesional/>
            <FormularioRegistro/>
            <TableEmpresa/>
            

        </Grid>
    )

}


export default Empresas;