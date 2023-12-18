import React, { useState } from "react";
import { List, ListItem, ListItemText, Collapse } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Output, ArrowDropDown } from "@mui/icons-material";
import Swal from "sweetalert2";

const SidebarProfesional = () => {
  const [empresaOpen, setEmpresaOpen] = useState(false);
  const [practicasOpen, setPracticasOpen] = useState(false);
  const navigate = useNavigate();

  const handleEmpresaDropdown = () => {
    setEmpresaOpen(!empresaOpen);
    // Cerrar la otra lista desplegable al abrir esta
    setPracticasOpen(false);
  };

  const handlePracticasDropdown = () => {
    setPracticasOpen(!practicasOpen);
    // Cerrar la otra lista desplegable al abrir esta
    setEmpresaOpen(false);
  };

  const logout = () => {
    setEmpresaOpen(false);
    setPracticasOpen(false);
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
      
      <ListItem button onClick={handleEmpresaDropdown}>
        <ListItemText sx={{ textAlign: "center" }} primary="Empresas" />
        <ArrowDropDown />
      </ListItem>
      <Collapse in={empresaOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button onClick={() => navigate("/empresas")}>
            <ListItemText sx={{ textAlign: "center" }} primary="- Centros de practica" />
          </ListItem>
          <ListItem button onClick={() => navigate("/editarpractica")}>
            <ListItemText sx={{ textAlign: "center" }} primary="- Otro" />
          </ListItem>
          {/* Otros elementos específicos para la barra lateral del profesional */}
        </List>
      </Collapse>
      
      <ListItem button onClick={handlePracticasDropdown}>
        <ListItemText sx={{ textAlign: "center" }} primary="Oferta Prácticas" />
        <ArrowDropDown />
      </ListItem>
      <Collapse in={practicasOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button onClick={() => navigate("/nuevapractica")}>
            <ListItemText sx={{ textAlign: "center" }} primary="- Nueva Práctica" />
          </ListItem>
          <ListItem button onClick={() => navigate("/editarpractica")}>
            <ListItemText sx={{ textAlign: "center" }} primary="- Editar Práctica" />
          </ListItem>
          {/* Otros elementos específicos para la barra lateral del profesional */}
        </List>
      </Collapse>
      
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
