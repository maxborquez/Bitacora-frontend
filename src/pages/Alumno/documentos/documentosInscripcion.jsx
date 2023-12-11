import { Grid, Typography } from "@mui/material";
import HeaderAlumno from "../../../components/headers/headerAlumno";
import { useParams } from "react-router-dom";
import MostrarArchivos from "./components/mostrar_archivos";
import SubirConvenios from "./components/subir_convenios";
import SubirInformes from "./components/subir_informes";
import { FileCopyOutlined } from "@mui/icons-material";
import SidebarAlumno from "../../../components/sidebars/sidebarAlumno";

const DocumentosInscripcion = () => {
  const { id } = useParams();

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
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
          marginLeft: "300px",
          marginTop: "80px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", 
          justifyContent: "center", 
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center", marginBottom: "10px" }}>
          Documentos <FileCopyOutlined />
        </Typography>
        <Grid container spacing={2} sx={{ width: "100%", maxWidth: "800px" }}>
          <Grid item xs={12} md={6}>
            <SubirConvenios id={id} />
          </Grid>
          <Grid item xs={12} md={6}>
            <SubirInformes id={id} />
          </Grid>
        </Grid>
        <MostrarArchivos id={id} />
      </Grid>
    </Grid>
  );
};

export default DocumentosInscripcion;
