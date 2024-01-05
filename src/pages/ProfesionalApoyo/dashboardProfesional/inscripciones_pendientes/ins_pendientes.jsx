import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import HeaderProfesional from "../../../../components/headers/headerProfesional";
import SidebarProfesional from "../../../../components/sidebars/sidebarProfesional";

const InscripcionesPendientes = () => {
  // Supongamos que tienes datos de ejemplo
  const data = [
    { alumno: 'Juan Perez', rut: '20.356.893-9', oferta: 'Oferta A', accion: 'Aprobar/Rechazar' },
    { alumno: 'María González', rut: '19.40.587-1', oferta: 'Oferta B', accion: 'Aprobar/Rechazar' },
    // ... más datos
  ];

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item xs={12}>
        <HeaderProfesional />
      </Grid>

      {/* Contenido principal */}
      <Grid container item xs={12} sx={{ marginTop: '-110px' }}>
        {/* Sidebar */}
        <Grid item xs={3} sx={{ position: "sticky", top: 0, zIndex: 1, maxHeight: "100", overflowY: "auto", marginTop: '-198px' }}>
          <SidebarProfesional />
        </Grid>

        {/* Contenido principal a la derecha */}
        <Grid item xs={9} sx= {{marginTop: '-400px'}} container justifyContent="center" alignItems="center">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Tabla de inscripciones">
              <TableHead>
                <TableRow>
                  <TableCell>Alumno</TableCell>
                  <TableCell>RUT</TableCell>
                  <TableCell>Oferta que inscribe</TableCell>
                  <TableCell>Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.alumno}</TableCell>
                    <TableCell>{row.rut}</TableCell>
                    <TableCell>{row.oferta}</TableCell>
                    <TableCell>{row.accion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InscripcionesPendientes;
