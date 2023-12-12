import { Grid, Typography } from "@mui/material";
import HeaderAlumno from "../../../components/headers/headerAlumno";
import { useParams } from "react-router-dom";
import MostrarArchivos from "./components/mostrar_archivos";
import SubirConvenios from "./components/subir_convenios";
import SubirInformes from "./components/subir_informes";
import SidebarAlumno from "../../../components/sidebars/sidebarAlumno";
import { FileCopyOutlined } from "@mui/icons-material";

const DocumentosInscripcion = () => {
  const { id } = useParams();

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
        <Grid
          item
          sx={{
            flex: "0 0 auto",
            position: "fixed",
            top: "80px",
            height: "calc(100vh - 80px)",
            overflowY: "auto",
          }}
        >
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
          <Grid item sx={{ marginBottom: "20px" , marginTop:"20px"}}>
            <Typography
              variant="h5"
              sx={{ textAlign: "center", marginBottom: "10px" }}
            >
              Documentos <FileCopyOutlined />
            </Typography>
          </Grid>
          <Grid sx={{ display: "flex", gap: "20px" }}>
            <SubirConvenios id={id} />
            <SubirInformes id={id} />
          </Grid>
          <Grid>
          <MostrarArchivos id={id} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DocumentosInscripcion;
