import { Grid, Button } from "@mui/material";
import HeaderProfesional from "../../../../components/headers/headerProfesional";
import FormularioRegistro from "./formulario_registro";
import TableEmpresa from "../../../../components/tableEmpresas/tableEmpresa";
import SidebarProfesional from "../../../../components/sidebars/sidebarProfesional";
import { useNavigate } from "react-router-dom";

const Empresas = () => {
  const navigate = useNavigate();

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item xs={12}>
        <HeaderProfesional />
      </Grid>

      {/* Contenido principal */}
      <Grid container item xs={12} sx={{ marginTop: '-110px' }}>
        {/* Sidebar */}
        <Grid item xs={3} sx={{ position: "sticky", top: 0, zIndex: 1, maxHeight: "100", overflowY: "auto", marginTop: '10px' }}>
          <SidebarProfesional />
        </Grid>

        {/* Contenido principal a la derecha */}
        <Grid item xs={9} ml={40} container justifyContent="center">
          <FormularioRegistro sx={{ width: '100%', overflowX: 'hidden' }}/>
          <Grid item>
            <Button sx={{ marginLeft: "10px" }} variant="contained" onClick={() => navigate("/ingresar_empresa")}>Ingresa empresa page</Button>
          </Grid>
          <TableEmpresa sx={{ width: '100%', overflowX: 'hidden' }} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Empresas;
