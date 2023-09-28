import { Alert, Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import clienteAxios from "../../../../helpers/clienteaxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { CopyAll } from "@mui/icons-material";

const SubirConvenios = ({ id }) => {
    const [archivo, setArchivo] = useState(null);
    const [extension, setExtension] = useState(null);
    const [isPdf, setPdf] = useState(true);

    const handleArchivoSeleccionado = (e) => {
        if (e.target.files[0]?.name.includes(".pdf")) {
            setPdf(false);
            setArchivo(e.target.files[0]);
            setExtension(e.target.files[0].name.split(".")[1]);
        } else {
            setPdf(true);
            setArchivo(null);
            Swal.fire({
                title: "Error",
                text: "El tipo de archivo no es pdf",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        }
    };

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("tipo_archivo", extension);
        formData.append("id_inscripcion", Number(id));
        formData.append("tipo_documento", "Inscripción");
        formData.append("archivo", archivo);

        const response = await clienteAxios.post("/archivoinscripcion/create", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 200) {
            setArchivo(null);

            Swal.fire({
                title: "Registrado",
                text: "El pdf ha sido registrado correctamente",
                icon: "success",
                confirmButtonText: "Aceptar"
            });

            // Limpiar el input de archivo
            e.target.reset();

            setTimeout(() => {
                Swal.close();
                navigate(`/documentosinscripcion/${id}`);
                queryClient.refetchQueries("archivosinscripcion");
            }, 2000);
        }
    };

    return (
        <Grid item xs={11} xl={12} lg={6} md={6} sm={12}>
            <Card sx={{ width: "90%", margin: "0px auto", padding: "15px" }}>
                <Box>
                    <form onSubmit={onSubmit} style={{ width: "90%", margin: "0px auto", display: "flex", flexDirection: "column" }}>
                        <Typography variant="h5" sx={{ textAlign: "center", marginTop: "5px", marginBottom: "10px", display:"flex",justifyContent:"center",alignItems:"center" }}>Documentos Inscripción <CopyAll/> </Typography>
                        <Grid container sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <Grid item xs={11} xl={7} lg={10} md={6} sm={10}>
                                <TextField required type="file" onChange={handleArchivoSeleccionado} fullWidth />
                                <Alert sx={{ marginTop: "5px" }} severity="info">Por favor subir archivos .pdf</Alert>
                            </Grid>
                            <Grid item xs={11} xl={7} lg={10} md={6} sm={10} sx={{ marginTop: "10px" }}>
                                <Button disabled={isPdf} sx={{ display: "block", margin: "0px auto" }} type="submit" variant="contained">Enviar archivo</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Card>
        </Grid>
    );
};

export default SubirConvenios;
