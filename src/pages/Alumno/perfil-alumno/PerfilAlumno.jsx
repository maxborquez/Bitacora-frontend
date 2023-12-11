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
      }}
    >
      <Grid item>
        <HeaderAlumno />
      </Grid>
      <Grid
        container
        item
        sx={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
        }}
      >
        <Grid item sx={{ flex: "0 0 auto" }}>
          <SidebarAlumno />
        </Grid>
        <Grid item sx={{ flexGrow: 1, marginLeft: "250px" }}>
          <DataAlumno />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PerfilAlumno;
