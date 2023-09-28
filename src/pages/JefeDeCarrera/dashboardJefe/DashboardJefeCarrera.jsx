import { Grid, Typography } from "@mui/material";
import HeaderJefe from "../../../components/headers/headerJefe";
import ShowBitaJefe from "./BitacoraJefe/ShowBitaJefe";


const DashboardJefeCarrera = ()=>{

    return(
        <Grid sx={{
            width:"100%",
            display:"flex",
            flexDirection:"column"
        }}>
            <HeaderJefe/>
            <ShowBitaJefe/>
        </Grid>
    );
}

export default DashboardJefeCarrera;