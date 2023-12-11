import { Grid, Typography } from "@mui/material";
import HeaderAlumno from "../../../components/headers/headerAlumno";
import FormularioInscripcion from "./formularioInscripcion";
import { School } from "@mui/icons-material";
import SidebarAlumno from "../../../components/sidebars/sidebarAlumno";

const InscripcionPractica = () => {
  return (
    <Grid
      container
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Grid item sx={{ zIndex: 1000, position: "fixed", width: "100%" }}>
        <HeaderAlumno />
      </Grid>

      <Grid item sx={{ zIndex: 999, position: "fixed", top: "80px", height: "calc(100vh - 80px)", overflowY: "auto" }}>
        <SidebarAlumno />
      </Grid>

      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "250px", 
          width: "100%",
          paddingTop: "80px", 
        }}
      >
        <Typography variant="h5" style={{ textAlign: "center", marginTop: "15px", marginBottom: "15px" }}>
          Inscripción Práctica Profesional <School style={{ marginLeft: "5px" }} />
        </Typography>
        <FormularioInscripcion />
      </Grid>
    </Grid>
  );
};

export default InscripcionPractica;
