import { Typography,Grid } from "@mui/material"
import HeaderProfesional from "../../../../components/headers/headerProfesional";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";
import FormularioModificar from "./components/formularioModificar";
import { useEffect, useState } from "react";


const ModificarEmpresa = ()=>{
    const {id} = useParams();
        return (
            <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
                <HeaderProfesional/>
               
                <FormularioModificar  id={id}  />
            </Grid>
        )
       
    
}

export default ModificarEmpresa;
