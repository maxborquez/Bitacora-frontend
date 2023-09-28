import React from "react";
import clienteAxios from "../../../../helpers/clienteaxios";
import { useQuery } from "react-query";
import { Button, CircularProgress, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { DocumentScanner, Image } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import Swal from 'sweetalert2';

const ShowBitaJefe = () => {
  
  const id_usuario = localStorage.getItem("id_usuario");

  const { data, status, refetch } = useQuery("bitacorajefe", async () => {
    const response = await clienteAxios.post(`/bitacorajefe/getAll`, {
      id_usuario: id_usuario
    });
    return response.data;
  }, {
    refetchOnWindowFocus: false
  });
  const formato = (texto) => {
    return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
  }
  
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/detailsbitacorajefe/${id}`);
  }
  const BitacoraDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!',
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        // La función de callback se ejecutará si el usuario hace clic en "Aceptar"
        //const response = await axios.delete(`${BASE_API}/${id}`);
        const response = await clienteAxios.delete(`/bitacorajefe/delete/${id}`);
        if (response.status === 200) {

          Swal.fire({
            title: "Eliminado",
            text: "La bitácora ha sido eliminada correctamente",
            icon: "success",
            confirmButtonText: "Aceptar"
          })
          setTimeout(() => {
            Swal.close()
            refetch()
           
          }, 2000)
        } else {
          Swal.fire({
            title: "Error",
            text: "Ha ocurrido un error al eliminar la bitácora",
            icon: "error",
            confirmButtonText: "Aceptar"
          })
        }

      }
    });
  }
  const BitacoraEdit = (id) => {
    navigate(`/modificarbitacorajefe/${id}`);
  }


  const columns = [
    "Título",
    "Fecha Creación",
    "Estado Bitácora",
    "Tipo Bitácora",
    {
      name: "Acciones",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const bitacora = data.bitacojefe[tableMeta.rowIndex];
          return (
            <>
              <Tooltip title="Ver detalle bitácora">
                <VisibilityIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleNavigate(bitacora.id_bitacora)}
                />
              </Tooltip>
              <Tooltip title="Modificar bitácora">
                <ModeEditOutlineIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => BitacoraEdit(bitacora.id_bitacora)}
                />
              </Tooltip>
              <Tooltip title="Eliminar bitácora">
                <DeleteIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => BitacoraDelete(bitacora.id_bitacora)}
                />
              </Tooltip>

                      <Tooltip title="Documentos Bitacora">
                         <DocumentScanner sx={{cursor:"pointer"}} onClick={() => navigate(`/archivosbitacorajefe/${bitacora.id_bitacora}`)}/>
                      </Tooltip>
                     
                    
                   
                      <Tooltip title="Imágenes Bitácora">
                         <Image sx={{cursor:"pointer"}} onClick={() => navigate(`/imagenesbitacorajefe/${bitacora.id_bitacora}`)}/>
                      </Tooltip>
                     
                    
             
            </>
          );
        },
      },
    },
  ];

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
  

  if (status === "loading") {
    return (
      <div>
        Cargando datos.....
        <CircularProgress />
      </div>
    );
  }

  if (status === "success" && !data.bitacojefe) {
    return (
      
      <Grid sx={{width:"80%",margin:"0px auto",display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:"100px"}}>
        
        <Typography variant="h5">No hay bitácoras disponibles.</Typography>
        <Button  onClick={()=>{navigate("/bitacorajefe")}} variant="contained">Haz click Aquí para crear una bitácora</Button>
        
        </Grid>
    );
  }

  if (status === "success" && data.bitacojefe.length > 0) {
    return (
      <div style={{ width: "90%", margin: "0px auto", marginTop:"15px",display:"flex",flexDirection:"column"}}>
         <Button variant="contained" onClick={()=>{navigate("/bitacorajefe")}} sx={{margin:"0px auto",marginBottom:"15px"}}>Crear Bitácoras</Button>
        <MUIDataTable
          title="Listado de Bitácoras"
          data={data.bitacojefe.map((bitacora) => [
            bitacora.titulo,
            formato(bitacora.fecha_creacion.split("T")[0]),
            bitacora.estado_bitacora.nombre_estado_bitacora,
            bitacora.tipo_bitacora.nombre_tipo_bitacora,
          ])}
          columns={columns}
          options={options}
        />
      </div>
    );
  }

  return null;
};

export default ShowBitaJefe;