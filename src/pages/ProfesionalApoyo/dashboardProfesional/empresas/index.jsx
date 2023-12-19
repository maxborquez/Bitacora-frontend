import { Grid, Box } from "@mui/material";
import HeaderProfesional from "../../../../components/headers/headerProfesional";
import FormularioRegistro from "./formulario_registro";
import TableEmpresa from "../../../../components/tableEmpresas/tableEmpresa";
import SidebarProfesional from "../../../../components/sidebars/sidebarProfesional";

const Empresas = () => {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item xs={12}>
        <HeaderProfesional />
      </Grid>

      {/* Contenido principal */}
      <Grid container item xs={12} sx={{ marginTop: '-135px' }}>
        {/* Sidebar */}
        <Grid item xs={3} sx={{ position: "sticky", top: 0, zIndex: 1, maxHeight: "calc(100vh - 64px)", overflowY: "auto"}}>
          <SidebarProfesional />
        </Grid>

        {/* Contenido principal a la derecha */}
        <Grid item xs={12} ml={40} container justifyContent="center">
            <FormularioRegistro sx={{ width: '100%', overflowX: 'hidden' }}/>
            <TableEmpresa sx={{ width: '100%', overflowX: 'hidden' }} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Empresas;
