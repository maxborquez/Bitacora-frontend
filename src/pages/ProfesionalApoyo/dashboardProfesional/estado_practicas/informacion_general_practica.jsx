import { Grid } from "@mui/material";
import HeaderProfesional from "../../../../components/headers/headerProfesional";
import DetalleInscripcion from "./components/detalleInscripcion";
import { useParams } from "react-router-dom";






const InformacionGeneral = ()=>{
    const {inscribe} = useParams();
    return (
        <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
            <HeaderProfesional/>
            <DetalleInscripcion id = {inscribe} />
        </Grid>
    )
}

export default InformacionGeneral;