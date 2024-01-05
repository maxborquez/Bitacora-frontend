import { Grid, Button } from "@mui/material";
import HeaderProfesional from "../../../components/headers/headerProfesional";
import TableEmpresa from "../../../../src/components/tableEmpresas/tableEmpresa";
import SidebarProfesional from "../../../components/sidebars/sidebarProfesional";

const EmpresaAlumno = () => {
  
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item xs={12}>
        <HeaderProfesional />
      </Grid>

      {/* Contenido principal */}
      <Grid container item xs={12} sx={{ marginTop: '-90px' }}>
        {/* Sidebar */}
        <Grid item xs={3} sx={{ position: "sticky", top: 0, zIndex: 1, overflowY: "auto", marginTop: '-45px' }}>
          <SidebarProfesional />
        </Grid>

        {/* Contenido principal a la derecha */}
        <Grid item xs={9} ml={40} container justifyContent="center">
          <h2>Empresas sugeridas por alumnos</h2>
          <TableEmpresa sx={{ width: '100%', overflowX: 'hidden' }} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EmpresaAlumno;
