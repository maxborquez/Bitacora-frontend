import { Grid, Box } from "@mui/material";
import HeaderProfesional from "../../../../components/headers/headerProfesional";
import MostrarOfertas from "./components/mostrar_ofertas";
import SidebarProfesional from "../../../../components/sidebars/sidebarProfesional";

const OfertaPractica = () => {
  return (
    <Box sx={{ height: "100vh", overflowY: "auto" }}>
      <Grid container>
        <Grid item xs={12} sx={{ position: "sticky", top: 0, zIndex: 1 }}>
          <HeaderProfesional />
        </Grid>

        <Grid item xs={3} sx={{ position: "sticky", top: 0, zIndex: 1, maxHeight: "calc(100vh - 64px)", overflowY: "auto" }}>
          <SidebarProfesional />
        </Grid>

        <Grid item xs={9} ml={40} sx={{ overflowY: "auto", paddingRight: "16px", overflowX: "auto" }}>
          <MostrarOfertas />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OfertaPractica;
