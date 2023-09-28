import { Grid, Paper, CircularProgress, Tooltip } from "@mui/material";
import { useQuery } from "react-query";
import clienteAxios from "../../../../../helpers/clienteaxios";
import { Psychology, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";

const ListadoAlumnos = ({ anio, periodo, asignatura, carrera }) => {
  const navigate = useNavigate();

  const getListadoAlumnos = useQuery("listadoalumnos", async () => {
    const response = await clienteAxios.post("/inscripcion/listadogeneral", {
      anio: Number(anio),
      periodo_academico: Number(periodo),
      asignatura: Number(asignatura),
      carrera: Number(carrera),
    });

    if (response.status === 200) {
      return response.data;
    }
  });

  const columns = [
    "RUT",
    "Nombre",
    "Apellido",
    "Correo",
    "Periodo académico",
    {
      name: "Acciones",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const alumno = getListadoAlumnos.data.alumnos[tableMeta.rowIndex];
          return (
            <>
              <Tooltip title="Ver inscripción practica profesional">
                <Visibility
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/informaciongeneral/${alumno.id_inscripcion}`);
                  }}
                />
              </Tooltip>
              <Tooltip title="Conocimentos">
                <Psychology
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/aptitudes/${alumno.id_alumno}`);
                  }}
                />
              </Tooltip>
            </>
          );
        },
      },
    },
  ];
  

  const data =
    getListadoAlumnos.status === "success"
      ? getListadoAlumnos.data.alumnos.map((alumno) => [
          alumno.alumno.rut,
          alumno.alumno.primer_nombre,
          alumno.alumno.apellido_paterno,
          alumno.alumno.correo_institucional,
          `${alumno.periodo_academico.anio} - ${alumno.periodo_academico.id_periodo_academico}`,
          "",
        ])
      : [];

      const options = {
        filter: true,
        search: true,
        selectableRows: "none",
        responsive: "standard",
        rowsPerPage: 10,
        download: false,
        print: false,
        rowsPerPageOptions: [10, 25, 50],
        textLabels: {
          body: {
            noMatch: "No se encontraron registros",
            toolTip: "Ordenar",
          },
          pagination: {
            next: "Siguiente",
            previous: "Anterior",
            rowsPerPage: "Filas por página:",
            displayRows: "de",
          },
          toolbar: {
            search: "Buscar",
            downloadCsv: "Descargar CSV",
            print: "Imprimir",
            viewColumns: "Ver Columnas",
            filterTable: "Filtrar Tabla",
          },
          filter: {
            all: "Todos",
            title: "Filtros",
            reset: "Reiniciar",
          },
          viewColumns: {
            title: "Mostrar Columnas",
            titleAria: "Mostrar/Ocultar Columnas de Tabla",
          },
          selectedRows: {
            text: "fila(s) seleccionada(s)",
            delete: "Eliminar",
            deleteAria: "Eliminar Filas Seleccionadas",
          },
        },
      };
      
  if (getListadoAlumnos.status === "loading") {
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

  return (
    <Grid sx={{width:"90%",margin:"0px auto",marginTop:"30px"}}>
         <MUIDataTable
            title="Listado de alumnos"
            data={data}
            columns={columns}
            options={options}
            />
    </Grid>
   
  );
};

export default ListadoAlumnos;