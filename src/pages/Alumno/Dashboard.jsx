import { Grid } from "@mui/material";
import SidebarAlumno from "../../../src/components/sidebars/sidebarAlumno";
import HeaderAlumno from "../../components/headers/headerAlumno";
import OfertasPracticas from "./components/OfertaPracticas";
import ComprobarInscripcion from "./components/comprobarInscripcion";

const DashboardAlumno = () => {
  return (
    <Grid
      container
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid item sx={{ zIndex: 1000, position: "fixed", width: "100%" }}>
        <HeaderAlumno />
      </Grid>
      <Grid
        container
        item
        sx={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          marginTop: "80px", 
        }}
      >
        <Grid item sx={{ flex: "0 0 auto", position: "fixed", top: "80px", height: "calc(100vh - 80px)", overflowY: "auto" }}>
          <SidebarAlumno />
        </Grid>

        <Grid
          container
          item
          sx={{
            flexDirection: "column",
            justifyContent: "center", 
            textAlign: "center", 
            flexGrow: 1,
            marginLeft: "250px", 
          }}
        >
          <Grid item sx={{ marginBottom: "20px" }}>
            <ComprobarInscripcion />
          </Grid>
          <Grid item>
            <OfertasPracticas />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardAlumno;
