import { Grid } from "@mui/material";
import HeaderAlumno from "../../../components/headers/headerAlumno";
import SidebarAlumno from "../../../components/sidebars/sidebarAlumno";
import DataAlumno from "./components/data_alumno";

const PerfilAlumno = () => {
  return (
    <Grid
      container
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative", 
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
          item
          sx={{
            flexGrow: 1,
            marginLeft: "250px",
            paddingLeft: "20px", 
          }}
        >
          <DataAlumno />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PerfilAlumno;
