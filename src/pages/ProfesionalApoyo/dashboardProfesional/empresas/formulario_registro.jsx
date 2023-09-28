import { useForm } from "react-hook-form";
import { Grid, Button, Box, TextField, Typography, Modal, MenuItem, InputLabel, Alert, FormControl } from "@mui/material";
import Select from "@mui/material/Select"
import { useRef, useState } from "react";
import { Apartment, Business } from "@mui/icons-material";
import { useQuery, useQueryClient } from "react-query";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../../../helpers/clienteaxios";
import Autocomplete from "@mui/material/Autocomplete";

const FormularioRegistro = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [region, setRegion] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [comunas, setComunas] = useState([]);
    const [comuna, setComuna] = useState("");
    const queryClient = useQueryClient();

    const formRef = useRef(null)
    const handleComuna = (event) => {
        setComuna(event.target.value);
    }
    const handleReset = () => {

    };


    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const onSubmit = async (data) => {

        Swal.fire({
            title: '¿Estás seguro de los datos?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: "Cancelar",
            customClass: {
                container: "sweetalert_container"
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const data_oficial = {
                    rut_empresa: data.rut_empresa,
                    razon_social: data.razon_social,
                    direccion: data.direccion,
                    centro_practica: selectedValue == 1 ? true : false,
                    correo: data.correo,
                    telefono: data.telefono,
                    id_comuna: comuna.id_comuna,
                    id_estado_empresa: 1

                }
                console.log(data_oficial)
                handleOpen()

                const response = await clienteAxios.post("/empresa/create", data_oficial);


                if (response.status === 200) {
                    Swal.fire({
                        title: "Registrado",
                        text: "La empresa ha sido registrada correctamente",
                        icon: "success",
                        confirmButtonText: "Aceptar",
                        customClass: {
                            container: "sweetalert_container"
                        }
                    })
                    setTimeout(() => {

                        setOpen(false);
                        queryClient.refetchQueries("empresas")
                        formRef.current.reset();
                        Swal.close();
                    }, 2000)
                }

            }
        });



    }


    const getcomunas = useQuery("comunas", async () => {
        const response = await clienteAxios.get("/comuna/getComunas");

        return response.data.comuna;
    })

    return (
        <>
            <Grid container spacing={1} sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "15px" }}>
               
                <Grid item>
                    <Button variant="contained" onClick={handleOpen} sx={{ marginBottom: "10px" }} >Ingresar Empresa</Button>
                </Grid>

            </Grid>

            <Modal sx={{ zIndex: 2 }} open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: "70%",
                        bgcolor: 'background.paper',
                        maxHeight: '80vh',
                        boxShadow: 24,
                        overflow: "auto",
                        p: 4,
                    }}
                >
                    <Typography variant="h5" sx={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>Registro de empresa <Business style={{ marginLeft: "5px" }} /> </Typography>

                    <form method="POST" ref={formRef} onSubmit={handleSubmit(onSubmit)} >
                        <Grid sx={{ marginBottom: "10px", marginTop: "10px" }}>
                            <TextField label="Rut empresa" fullWidth
                                {...register("rut_empresa", { required: true })}
                            />
                            {errors.rut_empresa && <Alert sx={{ marginTop: "5px" }} severity="error" >Este campo es requerido</Alert>}

                        </Grid>
                        <Grid sx={{ marginBottom: "10px", marginTop: "10px" }}>
                            <TextField label="Razón social"
                                {...register("razon_social", { required: true })}
                                fullWidth />
                            {errors.rut_empresa && <Alert sx={{ marginTop: "5px" }} severity="error" >Este campo es requerido</Alert>}
                        </Grid>
                        <Grid sx={{ marginBottom: "10px", marginTop: "10px" }}>
                            <TextField label="Dirección"
                                {...register("direccion", { required: true })}
                                fullWidth />
                            {errors.direccion && <Alert sx={{ marginTop: "5px" }} severity="error" >Este campo es requerido</Alert>}
                        </Grid>
                        <Grid sx={{ marginBottom: "10px", marginTop: "10px" }}>
                            <FormControl fullWidth>

                                <InputLabel id="yes-no-select-label">Centro de práctica</InputLabel>
                                <Select labelId="yes-no-select-label"
                                    id="yes-no-select"
                                    value={selectedValue}
                                    label="Centro de práctica"
                                    required
                                    onChange={handleChange}
                                    fullWidth >
                                    <MenuItem value={1}>Si</MenuItem>
                                    <MenuItem value={0}>No</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>

                        <Grid sx={{ marginBottom: "10px", marginTop: "10px" }}>
                            <TextField label="Correo" fullWidth type="email"
                                {...register("correo", { required: true })}

                            />
                            {errors.correo && <Alert sx={{ marginTop: "5px" }} severity="error" >Este campo es requerido</Alert>}

                        </Grid>
                        <Grid sx={{ marginBottom: "10px", marginTop: "10px" }}>
                            <TextField label="Teléfono" fullWidth
                                type="number"
                                placeholder="9xxxxxxxx"
                                {...register("telefono", { required: true })}
                            />
                            {errors.telefono && <Alert sx={{ marginTop: "5px" }} severity="error" >Este campo es requerido</Alert>}
                        </Grid>

                        <Grid sx={{ marginBottom: "10px", marginTop: "10px" }}>
                            <Autocomplete
                                options={getcomunas.data || []} 
                                getOptionLabel={(option) => option.nombre || ""} 
                                value={comuna}
                                onChange={(event, newValue) => {
                                    setComuna(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} label="Comuna" fullWidth />}
                                noOptionsText="Sin coincidencias" 
                            />
                        </Grid>

                        <Grid sx={{ marginBottom: "10px", marginTop: "10px" }}>
                            <Button variant="contained"
                                type="submit"
                                fullWidth
                            >
                                Registrar Empresa
                            </Button>
                            <Button fullWidth sx={{ marginTop: "10px" }} color="error" variant="contained" onClick={handleClose}>Cerrar</Button>
                        </Grid>

                    </form>
                </Box>
            </Modal>
        </>
    )
}


export default FormularioRegistro;