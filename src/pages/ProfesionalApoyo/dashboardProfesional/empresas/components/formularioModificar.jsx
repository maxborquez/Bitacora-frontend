import {Grid,Button,Box,TextField,Typography,Modal,MenuItem,InputLabel,FormControl,Card,} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "@mui/material/Select";
import { useQuery } from "react-query";
import clienteAxios from "../../../../../helpers/clienteaxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
const FormularioModificar = ({ id }) => {
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const [rut_empresa, setRut] = useState("");
    const [razon_social, setRazonSocial] = useState("");
    const [direccion, setDireccion] = useState("");
    const [centro_practica, setCentroPractica] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [comuna, setComuna] = useState({});
    const [estado, setEstado] = useState("");
    const [empresa, setEmpresa] = useState({id_comuna:"",nombre:""});

    const getcomunas = useQuery("comunas", async () => {
        const response = await clienteAxios.get("/comuna/getComunas");
        if (response.status == 200) {
            return response.data.comuna;
        }
    });
    const navigate = useNavigate();
    const getEmpresa = async () => {
        const response = await clienteAxios.get(`/empresa/show/${id}`);
        if (response.status == 200) {
           
            setEmpresa(response.data.empresa);
            setRut(response.data.empresa.rut_empresa);
            setRazonSocial(response.data.empresa.razon_social);
            setDireccion(response.data.empresa.direccion);
            const is_centro = response.data.empresa.centro_practica == true ? 1 : 0;
            setCentroPractica(is_centro);
            setCorreo(response.data.empresa.correo);
            setTelefono(response.data.empresa.telefono);
            console.log(response.data);
            setComuna(response.data.empresa.comuna);
            setEstado(response.data.empresa.id_estado_empresa);
            setLoading(false);
        }
    };

    useEffect(() => {
        getEmpresa();
    }, []);

    const handleComuna = (event) => {
        setComuna(event.target.value);
    };

    const getEstados = useQuery("estados", async () => {
        const response = await clienteAxios.get("/estadoempresa/getall");
        return response.data.estados;
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        const data_oficial = {
            rut_empresa: rut_empresa,
            razon_social: razon_social,
            direccion: direccion,
            centro_practica: centro_practica == 1 ? true : false,
            correo: correo,
            telefono: telefono,
            id_comuna: comuna.id_comuna,
            id_estado_empresa: estado,
        };
        const response = await clienteAxios.put(
            `empresa/update/${id}`,
            data_oficial
        );

        if (response.status == 200) {
            Swal.fire({
                title: "Actualizada",
                text: "La empresa ha sido actualizada correctamente",
                icon: "success",
                confirmButtonText: "Aceptar",
                customClass: {
                    container: "sweetalert_container",
                },
            });
            setTimeout(() => {
                navigate("/empresas");
                Swal.close();
            }, 2000);
        }
    };
    if (!loading) {
        return (
            <Grid sx={{ width: "90%", margin: "0px auto" }}>
                <Card
                    sx={{
                        padding: "20px",
                        marginTop: "15px",
                        backgroundColor: "#f4f5f7",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            textAlign: "center",
                            marginTop: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        Empresa seleccionada: {empresa.razon_social}{" "}
                    </Typography>
                    <form method="POST" onSubmit={onSubmit}>
                        <Grid container spacing={2} sx={{ marginTop: "10px" }}>
                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                <TextField
                                    sx={{ backgroundColor: "white" }}
                                    label="Rut"
                                    fullWidth
                                    value={rut_empresa}
                                    onChange={(e) => {
                                        setRut(e.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                <TextField
                                    sx={{ backgroundColor: "white" }}
                                    label="Razón social"
                                    value={razon_social}
                                    onChange={(e) => {
                                        setRazonSocial(e.target.value);
                                    }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                <TextField
                                    label="Dirección"
                                    sx={{ backgroundColor: "white" }}
                                    value={direccion}
                                    onChange={(e) => {
                                        setDireccion(e.target.value);
                                    }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                <FormControl fullWidth>
                                    <InputLabel>Centro de práctica</InputLabel>
                                    <Select
                                        sx={{ backgroundColor: "white" }}
                                        label="Centro de práctica"
                                        required
                                        fullWidth
                                        value={centro_practica}
                                        onChange={(e) => {
                                            setCentroPractica(e.target.value);
                                        }}
                                    >
                                        <MenuItem value={1}>Si</MenuItem>
                                        <MenuItem value={0}>No</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                <TextField
                                    label="Correo"
                                    sx={{ backgroundColor: "white" }}
                                    value={correo}
                                    onChange={(e) => {
                                        setCorreo(e.target.value);
                                    }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                <TextField
                                    label="Teléfono"
                                    sx={{ backgroundColor: "white" }}
                                    value={telefono}
                                    onChange={(e) => {
                                        setTelefono(e.target.value);
                                    }}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                <Autocomplete sx={{ marginTop: "15px", backgroundColor: 'white' }}
                                    options={getcomunas.data || []}
                                    getOptionLabel={(option) => option.nombre || ""}
                                    value={comuna}
                                    onChange={(event, newValue) => {
                                        setComuna(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Comuna" fullWidth />
                                    )}
                                    noOptionsText="Sin coincidencias" 
                                />
                            </Grid>
                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel>Estado Empresa</InputLabel>
                                    <Select
                                        label="Estado Empresa"
                                        sx={{ backgroundColor: "white" }}
                                        value={estado}
                                        onChange={(e) => {
                                            setEstado(e.target.value);
                                        }}
                                        fullWidth
                                    >
                                        {getEstados.status == "success" &&
                                            getEstados.data.map((estado, idx) => {
                                                return (
                                                    <MenuItem key={idx} value={estado.id_estado_empresa}>
                                                        {estado.nombre_estado_empresa}
                                                    </MenuItem>
                                                );
                                            })}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                item
                                xs={12}
                                xl={12}
                                lg={12}
                                md={12}
                                sm={12}
                            >
                                <Button
                                    variant="contained"
                                    type="submit"
                                    fullWidth
                                    sx={{ width: "50%", margin: "0px auto" }}
                                >
                                    Actualizar Empresa
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Grid>
        );
    }
};

export default FormularioModificar;
