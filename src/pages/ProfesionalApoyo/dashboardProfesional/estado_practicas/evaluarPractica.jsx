import { Grid, Typography } from "@mui/material";
import HeaderProfesional from "../../../../components/headers/headerProfesional";
import { useParams } from "react-router-dom";
import FormularioEvaluacion from "./components/formularioEvaluacion";



const EvaluarPractica = ()=>{

    const {id} = useParams();
    return (
        <Grid sx={{width:"100%",display:"flex",flexDirection:"column"}}>
            <HeaderProfesional/>
            <Typography variant="h5" sx={{textAlign:"center",marginTop:"15px",marginBottom:"15px"}}>Evaluar práctica</Typography>
            <FormularioEvaluacion id={id} />
        </Grid>
    )
}


export default EvaluarPractica;