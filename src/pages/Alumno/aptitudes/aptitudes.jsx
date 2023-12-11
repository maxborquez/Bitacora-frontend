import { Box, Grid, Typography } from "@mui/material";
import HeaderAlumno from "../../../components/headers/headerAlumno";
import MisAptitudes from "../perfil-alumno/components/misApitudes";
import ModalAptitudes from "../perfil-alumno/components/ModalAptitudes";
import { PsychologyAltRounded } from "@mui/icons-material";
import SidebarAlumno from "../../../components/sidebars/sidebarAlumno";

const Aptitudes = () => {
  const rut = localStorage.getItem("rut");
  const id_alumno = localStorage.getItem("id_alumno");

  return (
    <Grid container sx={{ minHeight: "100vh", margin: 0, overflow: "hidden" }}>
      <Grid
        item
        xs={12}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        <HeaderAlumno />
      </Grid>
      <Grid
        item
        xs={12}
        md={3}
        sx={{
          position: "fixed",
          top: "80px",
          left: 0,
          width: "250px",
          overflowY: "auto",
        }}
      >
        <SidebarAlumno />
      </Grid>
      <Grid
        item
        xs={12}
        md={9}
        sx={{
          marginLeft: "250px",
          padding: "2px",
        }}
      >
        <Typography variant="h5" sx={{ color: "black", textAlign: "center", transition: "all 1000ms", marginTop: "30px" }}>
          <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
            <PsychologyAltRounded sx={{ fontSize: "3rem", mr: 2 }} />
            Aptitudes del Alumno
            <PsychologyAltRounded sx={{ fontSize: "3rem", ml: 2 }} />
          </Box>
        </Typography>
        <ModalAptitudes id_alumno={id_alumno} />
        <MisAptitudes id_alumno={id_alumno} />
      </Grid>
    </Grid>
  );
};

export default Aptitudes;
