import { Autocomplete, Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useQuery } from "react-query";
import clienteAxios from "../../../helpers/clienteaxios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const FormularioInscripcion = () => {
    const [fecha_inicio, setFechaInicio] = useState("");
    const [fecha_fin, setFechaFin] = useState("");
    const [select_modalidad, setSelectModalidad] = useState("");
    const [select_oferta, setSelectOferta] = useState(0);
    const [oferta, setOferta] = useState("");
    const [datos_evaluador, setDatosEvaluador] = useState(0);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [cargo, setCargo] = useState("");
    const [fechaMaxFin, setFechaMaxFin] = useState("");

    const navigate = useNavigate();
    const validateCargo = (input) => {
        const regex = /^[A-Za-z ]+$/;
        return regex.test(input);
    };
    const validateNombreApellido = (input) => {
        const regex = /^[A-Za-z ]+$/;
        return regex.test(input);
    };

    const validateTelefono = (input) => {
        const regex = /^[0-9]{9}$/; //9 dígitos
        return regex.test(input);
    };

    const validateCorreo = (input) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(input);
    };

    const modalidades = useQuery("modalidades", async () => {
        const response = await clienteAxios.get("/inscripcion/modalidades");
        if (response.status == 200) {
            return response.data.modalidades;
        }
    });

    const ofertas = useQuery("ofertas", async () => {
        const response = await clienteAxios.get("/oferta/getall");
        return response.data.ofertas;
    });



    const handleFechaInicio = (event) => {
        setFechaInicio(event.target.value);
        //calcula la fecha máxima permitida para 'fecha_fin'
        let fechaInicio = new Date(event.target.value);
        fechaInicio.setMonth(fechaInicio.getMonth() + 6);
        const año = fechaInicio.getFullYear();
        let mes = fechaInicio.getMonth() + 1; //los meses en JavaScript van de 0 a 11
        let dia = fechaInicio.getDate();

        //asegúrate de que los valores de día y mes tengan dos dígitos
        if (mes < 10) mes = "0" + mes;
        if (dia < 10) dia = "0" + dia;

        setFechaMaxFin(`${año}-${mes}-${dia}`);
    };
    const handleFechaFin = (event) => {
        setFechaFin(event.target.value);
    };
    const handleModalidad = (event) => {
        setSelectModalidad(event.target.value);
    };
    const handleOferta = (event) => {
        setSelectOferta(event.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        //validación para comprobar si las fechas de inicio y fin son iguales
        if (fecha_inicio === fecha_fin) {
            Swal.fire({
                title: "Error",
                text: "La fecha de inicio y la fecha de fin deben ser distintas",
                icon: "error",
            });
            return; //salir de la función si las fechas son iguales
        }

        const fechaInicioValidacion = new Date(fecha_inicio);
        const fechaFinValidacion = new Date(fecha_fin);
        //crea una nueva fecha sumando un mes a la fecha de inicio
        const unMesDespues = new Date(fechaInicioValidacion);
        unMesDespues.setMonth(fechaInicioValidacion.getMonth() + 1);

        //comparaa si la nueva fecha es todavía mayor o igual que la fecha de fin
        if (unMesDespues > fechaFinValidacion) {
            Swal.fire({
                title: "Error",
                text: "El rango entre la fecha de inicio y la fecha de fin debe ser de al menos 1 mes",
                icon: "error",
            });
            return;
        }

        if (datos_evaluador === 1) {
            if (
                !validateNombreApellido(nombre) ||
                !validateNombreApellido(apellido)
            ) {
                Swal.fire({
                    title: "Error",
                    text: "Nombre y apellido solo deben contener carácteres alfabéticos",
                    icon: "error",
                });
                return;
            }

            if (!validateTelefono(telefono)) {
                Swal.fire({
                    title: "Error",
                    text: "El teléfono debe contener 9 dígitos numéricos",
                    icon: "error",
                });
                return;
            }

            if (!validateCorreo(correo)) {
                Swal.fire({
                    title: "Error",
                    text: "Por favor, ingresa un correo válido",
                    icon: "error",
                });
                return;
            }

            if (!validateCargo(cargo)) {
                Swal.fire({
                    title: "Error",
                    text: "El campo 'Cargo' solo debe contener carácteres alfabéticos",
                    icon: "error",
                });
                return;
            }
        }

        const fechaInicio = new Date(fecha_inicio);
        const fechaFin = new Date(fecha_fin);
        let months;
        months = (fechaFin.getFullYear() - fechaInicio.getFullYear()) * 12;
        months -= fechaInicio.getMonth();
        months += fechaFin.getMonth();
        //aquí puedes agregar el cálculo para los días adicionales
        const diffDays = fechaFin.getDate() - fechaInicio.getDate();
        if (diffDays > 0) {
            months += 1;
        }
        if (months > 6) {
            Swal.fire({
                title: "Error",
                text: "El rango entre la fecha de inicio y la fecha de fin no debe exceder los 6 meses",
                icon: "error",
            });
            return;
        }


        var fechaHoy = new Date();
        var año = fechaHoy.getFullYear().toString();
        var mes = ("0" + (fechaHoy.getMonth() + 1)).slice(-2); //los meses en JavaScript van de 0 a 11, por lo tanto, se suma 1
        var dia = ("0" + fechaHoy.getDate()).slice(-2);

        //formato de fecha yy/mm/dd
        var fechaActual = año + "-" + mes + "-" + dia;
        const id_inscribe = localStorage.getItem("id_inscribe");
        if (select_oferta == 1 && datos_evaluador == 1) {
            //caso con todo los campos

            const data_evaluador = {
                nombre: nombre,
                apellido: apellido,
                telefono: telefono,
                correo: correo,
                cargo: cargo,
            };

            const response = await clienteAxios.post(
                "/representante/create",
                data_evaluador
            );

            if (response.status == 200) {
                const data_inscripcion = {
                    fecha_inscripcion_practica: fechaActual,
                    fecha_inicio: fecha_inicio,
                    fecha_fin: fecha_fin,
                    id_modalidad: select_modalidad,
                    id_oferta: Number(oferta.id_oferta),
                    id_inscribe: Number(id_inscribe),
                    id_estado_inscripcion: 1,

                    id_representante: Number(
                        response.data.representante.id_representante
                    ),
                };

                const response_inscripcion = await clienteAxios.post(
                    "/inscripcion/create",
                    data_inscripcion
                );
                console.log(response_inscripcion.data);
                if (response_inscripcion.status == 200) {
                    Swal.fire({
                        title: "Registrada",
                        text: "La inscripción ha sida registrada correctamente",
                        icon: "success",
                        confirmButtonText: "Aceptar",
                    });
                    setTimeout(() => {
                        Swal.close();

                        navigate("/alumno");
                    }, 2000);
                }
            }
        } else if (select_oferta == 1 && datos_evaluador == 0) {
            const data_inscripcion = {
                fecha_inscripcion_practica: fechaActual,
                fecha_inicio: fecha_inicio,
                fecha_fin: fecha_fin,
                id_modalidad: select_modalidad,
                id_oferta: Number(oferta.id_oferta_practica),
                id_representante: null,
                id_inscribe: Number(id_inscribe),
                id_estado_inscripcion: 1,
            };

            const response = await clienteAxios.post(
                "/inscripcion/create",
                data_inscripcion
            );
            if (response.status == 200) {
                Swal.fire({
                    title: "Registrada",
                    text: "La inscripción ha sida registrada correctamente",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                });
                setTimeout(() => {
                    Swal.close();
                    navigate("/alumno");
                }, 2000);
            }
            //Hago una peticion solamente
        } else if (select_oferta == 0 && datos_evaluador == 1) {
            // aqui hago dos
            const data_evaluador = {
                nombre: nombre,
                apellido: apellido,
                telefono: telefono,
                correo: correo,
                cargo: cargo,
            };
            const response = await clienteAxios.post(
                "/representante/create",
                data_evaluador
            );
            if (response.status == 200) {
                const data_inscripcion = {
                    fecha_inscripcion_practica: fechaActual,
                    fecha_inicio: fecha_inicio,
                    fecha_fin: fecha_fin,
                    id_modalidad: select_modalidad,
                    id_oferta: null,
                    id_representante: Number(
                        response.data.representante.id_representante
                    ),
                    id_inscribe: Number(id_inscribe),
                    id_estado_inscripcion: 1,
                };
                const response2 = await clienteAxios.post(
                    "/inscripcion/create",
                    data_inscripcion
                );
                if (response2.status == 200) {
                    Swal.fire({
                        title: "Registrada",
                        text: "La inscripción ha sida registrada correctamente",
                        icon: "success",
                        confirmButtonText: "Aceptar",
                    });
                    setTimeout(() => {
                        Swal.close();
                        navigate("/alumno");
                    }, 2000);
                }
            }
        }
        if (select_oferta == 0 && datos_evaluador == 0) {
            const data_inscripcion = {
                fecha_inscripcion_practica: fechaActual,
                fecha_inicio: fecha_inicio,
                fecha_fin: fecha_fin,
                id_modalidad: select_modalidad,
                id_oferta: null,
                id_representante: null,
                id_inscribe: Number(id_inscribe),
                id_estado_inscripcion: 1,
            };
            const response = await clienteAxios.post(
                "/inscripcion/create",
                data_inscripcion
            );
            if (response.status == 200) {
                Swal.fire({
                    title: "Registrada",
                    text: "La inscripción ha sida registrada correctamente",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                });
                setTimeout(() => {
                    Swal.close();
                    navigate("/alumno");
                }, 2000);
            }
        }
    };

    return (
        <form
            method="post"
            onSubmit={onSubmit}
            style={{ width: "75%", margin: "0px auto" }}
        >
            <Card sx={{ padding: "25px", backgroundColor: "#f4f5f7" }}>
                <Grid container spacing={2}>
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                        <TextField
                            sx={{ backgroundColor: "white" }}
                            required
                            label="Fecha Inicio"
                            onChange={handleFechaInicio}
                            InputLabelProps={{ shrink: true }}
                            type="date"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                        <TextField
                            sx={{ backgroundColor: "white" }}
                            label="Fecha Fin"
                            required
                            onChange={handleFechaFin}
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            min={fecha_inicio} //fecha mínima basada en fecha_inicio
                            max={fechaMaxFin} //fecha máxima basada en fecha_inicio
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel id="select-modalidad">Modalidad</InputLabel>
                            <Select
                                sx={{ backgroundColor: "white" }}
                                id="select-modalidad"
                                required
                                onChange={handleModalidad}
                                value={select_modalidad}
                                label="Modalidad"
                                fullWidth
                            >
                                {modalidades.status == "success" &&
                                    modalidades.data.map((modalidad, idx) => (
                                        <MenuItem value={modalidad.id_modalidad} key={idx}>
                                            {modalidad.nombre_modalidad}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                        <FormControl variant="outlined" margin="normal" fullWidth>
                            <InputLabel htmlFor="select-oferta">
                                ¿Tiene oferta de práctica?
                            </InputLabel>
                            <Select
                                sx={{ backgroundColor: "white" }}
                                required
                                id="select-oferta"
                                value={select_oferta}
                                onChange={handleOferta}
                                label="¿Tiene oferta de práctica?"
                                fullWidth
                            >
                                <MenuItem value={1}>Si</MenuItem>
                                <MenuItem value={0}>No</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {select_oferta == 1 && (
                        <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                            <FormControl variant="outlined" margin="normal" fullWidth>
                                <Autocomplete
                                    sx={{ backgroundColor: "white" }}
                                    options={ofertas.data || []}
                                    getOptionLabel={(option) => option.descripcion || ""}
                                    value={oferta}
                                    onChange={(event, newValue) => {
                                        setOferta(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Oferta de práctica"
                                            fullWidth
                                        />
                                    )}
                                    noOptionsText="Sin coincidencias"
                                />
                            </FormControl>
                        </Grid>
                    )}
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                        <FormControl variant="outlined" margin="normal" fullWidth>
                            <InputLabel htmlFor="select_evaluador" id="select-evaluador">
                                ¿Desea agregar al evaluador?
                            </InputLabel>
                            <Select
                                sx={{ backgroundColor: "white" }}
                                value={datos_evaluador}
                                required
                                label="¿Desea agregar al evaluador?"
                                onChange={(event) => {
                                    setDatosEvaluador(event.target.value);
                                }}
                                id="select-evaluador"
                                fullWidth
                            >
                                <MenuItem value={1}>Si</MenuItem>
                                <MenuItem value={0}>No</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {datos_evaluador == 1 && (
                        <Grid
                            container
                            item
                            spacing={2}
                            xs={11}
                            xl={6}
                            lg={6}
                            md={6}
                            sm={10}
                        >
                            <Grid item xs={11} xl={12} lg={12} md={12} sm={10}>
                                <Typography>Datos evaluador</Typography>
                            </Grid>
                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                <TextField
                                    sx={{ backgroundColor: "white" }}
                                    onChange={(e) => {
                                        setNombre(e.target.value);
                                    }}
                                    required
                                    label="Nombre"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                <TextField
                                    sx={{ backgroundColor: "white" }}
                                    label="Apellido"
                                    onChange={(e) => {
                                        setApellido(e.target.value);
                                    }}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                <TextField
                                    sx={{ backgroundColor: "white" }}
                                    placeholder="9xxxxxxxx"
                                    label="Teléfono"
                                    onChange={(e) => {
                                        setTelefono(e.target.value);
                                    }}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                <TextField
                                    sx={{ backgroundColor: "white" }}
                                    label="Correo"
                                    type="email"
                                    onChange={(e) => setCorreo(e.target.value)}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                                <TextField
                                    sx={{ backgroundColor: "white" }}
                                    fullWidth
                                    required
                                    label="Cargo"
                                    type="text"
                                    onChange={(e) => setCargo(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    )}
                    <Grid
                        item
                        xs={11}
                        xl={6}
                        lg={12}
                        md={6}
                        sm={10}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Button type="submit" variant="contained">
                            Enviar datos
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </form>
    );
};

export default FormularioInscripcion;
