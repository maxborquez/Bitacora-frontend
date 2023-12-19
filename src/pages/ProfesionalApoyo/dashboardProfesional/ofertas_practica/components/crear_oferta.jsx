import { Grid, Typography } from "@mui/material";
import HeaderProfesional from "../../../../../components/headers/headerProfesional";
import FormularioIngresar from "./FormularioIngresar";
import { Work } from "@mui/icons-material";
import SidebarProfesional from "../../../../../components/sidebars/sidebarProfesional";

const CrearOferta = () => {
  return (
    <Grid container sx={{ width: "100%", position: "relative" }}>
      {/* Encabezado fijo */}
      <Grid item xs={12} sx={{ position: "sticky", top: 0, zIndex: 10 }}>
        <HeaderProfesional />
      </Grid>

      {/* Barra lateral debajo del encabezado */}
      <Grid item xs={3} sx={{ position: "sticky", top: "64px", zIndex: 9 }}>
        <SidebarProfesional />
      </Grid>

      {/* Contenido principal */}
      <Grid item xs={9} sx={{ marginTop: "64px" }}>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          Crear Oferta Práctica Profesional{" "}
          <Work style={{ marginTop: "2px", marginLeft: "5px" }} />
        </Typography>
        <FormularioIngresar />
      </Grid>
    </Grid>
  );
};

export default CrearOferta;
