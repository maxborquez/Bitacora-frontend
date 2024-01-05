import React, { useState } from "react";
import { List, ListItem, ListItemText, Collapse } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Output, ArrowDropDown } from "@mui/icons-material";
import Swal from "sweetalert2";

const SidebarProfesional = () => {
  const [empresaOpen, setEmpresaOpen] = useState(false);
  const navigate = useNavigate();

  const handleEmpresaDropdown = () => {
    setEmpresaOpen(!empresaOpen);
  };

  const logout = () => {
    setEmpresaOpen(false);
    Swal.fire("Cerrando sesión", "redireccionando...", "success");
    setTimeout(() => {
      Swal.close();
      navigate("/");
    }, 2000);
  };

  return (
    <List
      sx={{
        width: "250px",
        backgroundColor: "#36465d",
        color: "white",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "fixed",
      }}
    >
      <ListItem button onClick={() => navigate("/dashboard")}>
        <ListItemText sx={{ textAlign: "center" }} primary="Inicio" />
      </ListItem>

      <ListItem
        button
        onClick={handleEmpresaDropdown}
        sx={{
          textAlign: "center", // Cambiar color de texto a azul claro si está abierto
        }}
      >
        <ListItemText primary="Empresas" />
        <ArrowDropDown />
      </ListItem>
      <Collapse in={empresaOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            onClick={() => navigate("/empresas")}
            sx={{
              textAlign: "center",
              backgroundColor: "#495970", // Cambiar color de fondo a gris claro
              color: "white", // Cambiar color de texto a negro
              '&:hover': {
                backgroundColor: '#425063',
                color: "white" // Mantener el color de fondo constante en hover
              },
            }}
          >
            <ListItemText primary="- Centros de práctica" />
          </ListItem>
          <ListItem
            button
            onClick={() => navigate("/empresa_alumno")}
            sx={{
              textAlign: "center",
              backgroundColor: "#495970", // Cambiar color de fondo a gris claro
              color: "white", // Cambiar color de texto a negro
              '&:hover': {
                backgroundColor: '#425063',
                color: "white" // Mantener el color de fondo constante en hover
              },
            }}
          >
            <ListItemText primary="- Recomendaciones alumnos" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={() => navigate("/ofertapracticas")}>
        <ListItemText
          primary="Oferta Prácticas"
          sx={{
            textAlign: "center",
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></ListItemText>
      </ListItem>
      <ListItem button onClick={() => navigate("/ins_pendientes")}>
        <ListItemText
          sx={{ textAlign: "center" }}
          primary="Inscripciones pendientes"
        />
      </ListItem>
      <ListItem button onClick={logout}>
        <ListItemText
          sx={{
            textAlign: "center",
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p> Cerrar Sesión</p> <Output />
        </ListItemText>
      </ListItem>
    </List>
  );
};

export default SidebarProfesional;
