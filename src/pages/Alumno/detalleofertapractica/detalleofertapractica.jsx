import { Card, CircularProgress, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import HeaderAlumno from "../../../components/headers/headerAlumno";
import { useQuery } from "react-query";
import clienteAxios from "../../../helpers/clienteaxios";
import { useParams } from "react-router-dom";
import SidebarAlumno from "../../../components/sidebars/sidebarAlumno";

const DetalleOfertaPractica = () => {
  const { id } = useParams();
  const getOferta = useQuery("detalleoferta", async () => {
    const response = await clienteAxios.get(`/oferta/show/${id}`);
    return response.data;
  });

  if (getOferta.status === "success") {
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
            paddingTop: "80px", 
          }}
        >
          {getOferta.status === "success" && getOferta.data.oferta && (
            <>
              <Typography
                sx={{
                  textAlign: "center",
                  marginTop: "15px",
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                variant="h5"
              >
                Detalle Oferta
              </Typography>
              <Card sx={{ padding: "30px", width: "70%", backgroundColor: "#f4f5f7" }}>
                <Typography sx={{ marginBottom: "10px" }}> <strong>Descripción:</strong> {getOferta.data.oferta.descripcion}</Typography>
                <Typography > <strong>Empresa:</strong> {getOferta.data.oferta.empresa.razon_social} </Typography>
                <br />
                <Typography ><strong>Correo:</strong> {getOferta.data.oferta.empresa.correo} </Typography>
                <br />
                <Typography> <strong>Teléfono:</strong> {getOferta.data.oferta.empresa.telefono} </Typography>
              </Card>
              <Card sx={{ padding: "30px", marginTop: "10px", width: "70%", marginBottom: "10px", backgroundColor: "#f4f5f7" }}>
                <Typography sx={{ marginLeft: "14px" }} ><strong>Condiciones:</strong> </Typography>
                <List>
                  <ListItem>
                    <ListItemText sx={{}}> <strong>Modalidad:</strong> {getOferta.data.oferta.modalidad.nombre_modalidad} </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText> <strong>Experiencia laboral:</strong> {getOferta.data.oferta.experiencia_laboral == true ? "Si" : "No"} </ListItemText>
                  </ListItem>
                </List>
              </Card>
            </>
          )}
        </Grid>
      </Grid>
    );
  }

  if (getOferta.status === "loading") {
    return (
      <Grid
        sx={{
          width: "35%",
          margin: "0px auto",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Cargando datos.........
        <CircularProgress />
      </Grid>
    );
  }
};

export default DetalleOfertaPractica;
