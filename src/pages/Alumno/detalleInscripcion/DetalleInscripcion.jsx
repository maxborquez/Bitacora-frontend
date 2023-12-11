import { Grid } from "@mui/material";
import HeaderAlumno from "../../../components/headers/headerAlumno";
import Detalle from "./components/Detalle";
import { useParams } from "react-router-dom";
import SidebarAlumno from "../../../components/sidebars/sidebarAlumno";

const DetalleInscripcion = () => {
  const { id } = useParams();

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

      <Grid item sx={{ flex: "0 0 auto", position: "fixed", top: "80px", height: "calc(100vh - 80px)", overflowY: "auto" }}>
        <SidebarAlumno />
      </Grid>

      <Grid item sx={{ flexGrow: 1, marginLeft: "250px", marginTop: "80px" }}>
        <Detalle id={id} />
      </Grid>
    </Grid>
  );
};

export default DetalleInscripcion;
