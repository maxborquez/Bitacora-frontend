import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import clienteAxios from "../../../../helpers/clienteaxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { QueryClient } from "react-query";



const RegistroEvaluador = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [cargo,setCargo] = useState("");
    const navigate = useNavigate();
    const queryClient = new QueryClient();
    const id_inscribe = localStorage.getItem("id_inscribe");

    
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

    const onSubmit = async(e)=>{
        e.preventDefault();

        if (!validateNombreApellido(nombre)) {
            Swal.fire("Error", "El nombre solo debe contener carácteres alfabéticos", "error");
            return;
        }
        if (!validateNombreApellido(apellido)) {
            Swal.fire("Error", "El apellido solo debe contener carácteres alfabéticos", "error");
            return;
        }
        if (!validateTelefono(telefono)) {
            Swal.fire("Error", "El teléfono debe contener exactamente 9 dígitos y ser solamente numérico", "error");
            return;
        }
        if (!validateCargo(cargo)) {
            Swal.fire("Error", "El cargo solo debe contener carácteres alfabéticos", "error");
            return;
        }
        const data_evaluador = {
            nombre:nombre,
            apellido:apellido,
            telefono:telefono,
            correo:correo,
            cargo:cargo
        }
        const response = await clienteAxios.post(`/representante/create`,data_evaluador);
    
        if(response.status==200){
             const response2 = await clienteAxios.put(`/inscripcion/actualizarepresentante/${id_inscribe}`,{
                id_representante: Number(response.data.representante.id_representante)
             })
             if(response2.status==200){
                Swal.fire({
                    title:"Registrada",
                    text:"La inscripción ha sida registrada correctamente",
                    icon:"success",
                    confirmButtonText:"Aceptar",
                })
                setTimeout(()=>{
                    Swal.close();
                    window.location.reload();
                    navigate(`/detalleinscripcion/${id_inscribe}`)
                },2000)
             }
        }
        
    }
    return (
        <form method="post" onSubmit={onSubmit} style={{width:"70%",margin:"0px auto",marginTop:"10px",marginBottom:"10px"}}>
        
            <Card sx={{padding:"40px"}}>
            <Typography variant="h6" sx={{textAlign:"center",marginBottom:"10px"}}>Datos evaluador</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                        <TextField onChange={(e) => { setNombre(e.target.value) }} required label="Nombre" fullWidth />
                    </Grid>
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                        <TextField label="Apellido" onChange={(e) => { setApellido(e.target.value) }} required fullWidth />
                    </Grid>
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                        <TextField label="Teléfono" placeholder="9xxxxxxxx" onChange={(e) => { setTelefono(e.target.value) }} required fullWidth />
                    </Grid>
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                        <TextField label="Correo" type="email" onChange={(e) => setCorreo(e.target.value)} required fullWidth />
                    </Grid>
                    <Grid item xs={11} xl={6} lg={6} md={6} sm={10}>
                        <TextField label="Cargo" type="text" onChange={(e) => setCargo(e.target.value)} required fullWidth />
                    </Grid>
                    <Grid item xs={11} xl={6} lg={12} md={10} sm={10} sx={{display:"flex"}}>
                         <Button variant="contained" type="submit" sx={{margin:"0px auto"}}>Enviar datos</Button>
                    </Grid>
                </Grid>
            </Card>
        </form>
    )
}

export default RegistroEvaluador;