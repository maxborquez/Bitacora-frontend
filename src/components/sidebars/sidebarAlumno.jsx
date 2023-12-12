import React, { useState } from "react";
import { List, ListItem, ListItemText, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import clienteAxios from "../../helpers/clienteaxios";
import { Output, ArrowForward, ArrowDropDown } from "@mui/icons-material";
import Swal from "sweetalert2";

const SidebarAlumno = () => {
  const [showPracticeOptions, setShowPracticeOptions] = useState(false);
  const navigate = useNavigate();

  const id_alumno = localStorage.getItem("id_alumno");
  const comprobar = useQuery("update_inscripcion", async () => {
    const response = await clienteAxios.post("/inscripcion/comprobar", {
      id_alumno: id_alumno,
    });
    if (response.status === 200) {
      localStorage.setItem(
        "id_inscripcion_practica",
        response.data.id_inscripcion
      );
      return response.data;
    }
  });

  const logout = () => {
    setOpen(false);
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
      <ListItem button onClick={() => navigate("/alumno")}>
        <ListItemText sx={{ textAlign: "center" }} primary="Inicio" />
      </ListItem>
      <ListItem button onClick={() => navigate("/perfil")}>
        <ListItemText sx={{ textAlign: "center" }} primary="Perfil" />
      </ListItem>
      <ListItem button onClick={() => navigate("/aptitudes")}>
        <ListItemText sx={{ textAlign: "center" }} primary="Aptitudes" />
      </ListItem>

      {/* Botón 'Práctica' */}
      <ListItem>
        <Button
          onClick={() => setShowPracticeOptions(!showPracticeOptions)}
          sx={{
            width: "100%",
            justifyContent: "center",
            textTransform: "none",
            color: "white",
          }}
        >
          Práctica < ArrowDropDown />
        </Button>
      </ListItem>

      {showPracticeOptions && (
        <>
          {comprobar.status === "success" &&
        comprobar.data.inscrito_sistema === true && (
          <ListItem
            button
            onClick={() =>
              navigate(`/showbitalumno/${comprobar.data.id_inscripcion}`)
            }
          >
            <ListItemText sx={{ textAlign: "center" }} primary="- Bitácoras" />
          </ListItem>
        )}
          <ListItem button onClick={() => navigate("/alumno")}>
          <ListItemText sx={{ textAlign: "center"}}  primary="- Informe" />
          </ListItem>
          <ListItem button onClick={() => navigate("/alumno")}>
          <ListItemText sx={{ textAlign: "center"}} primary="- Evaluacion" />
          </ListItem>
        </>
      )}

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

export default SidebarAlumno;
