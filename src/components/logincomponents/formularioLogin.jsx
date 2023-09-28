import { Input, Key, Lock, PermIdentity } from "@mui/icons-material";
import { Alert, Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import { useRut } from "react-rut-formatter";

import { AuthContext } from "../../context/AuthContext";

const FormularioLogin = ()=>{
    const { rut, updateRut, isValid } = useRut();
    const {register,handleSubmit,reset,formState:{errors}} = useForm({
        defaultValues:{
            contrasena:""
        }
    })
    const {login} = useContext(AuthContext);
    

    const onSubmit = async(data,e)=>{
        e.preventDefault();
        login(rut.formatted,data.contrasena);
    
        reset()
    }
    return (
        <Card sx={{width:"90%",padding:"10px",margin:"0px auto",marginTop:"30px"}}>
            <CardContent sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <Typography sx={{fontSize:"20px",display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center",marginTop:"5px",marginBottom:"15px"}}>Bienvenid@ <Input style={{marginLeft:"5px"}} /></Typography>
                <form onSubmit={handleSubmit(onSubmit)} >
                        <Box sx={{marginBottom:"15px",display:"flex",justifyContent:"center",alignItems:"center",flexWrap:"wrap"}}>
                            <TextField 
                        
                            label="Rut" 
                            name="rut"
                            value={rut.formatted} 
                            onChange={(e)=>{updateRut(e.target.value)}}
                            required
                            />
                            <PermIdentity style={{width:"40px"}}/>
                            {rut.formatted.length>0 && !isValid && <Alert style={{width:"60%",marginTop:"10px"}} severity="error">Rut inválido</Alert> }
                           
                            
                        </Box>
                        <Box sx={{marginBottom:"15px",display:"flex",justifyContent:"center",alignItems:"center",flexWrap:"wrap"}}>
                            <TextField  type="password" label="Contraseña"
                                required
                                name="contrasena"
                                {...register("contrasena",{required:true})}
                            />
                            <Lock style={{width:"40px"}}/>
                            {errors.password && <Alert style={{width:"50%",marginTop:"10px"}} severity="error">Este campo es requerido</Alert>}
                        </Box>
                        
                        <Box sx={{display:"flex",justifyContent:"center"}} >
                            <Button variant="contained" type="submit" >  <Key style={{marginRight:"5px"}} />  Ingresar</Button>
                        </Box>
                    </form>
            </CardContent>
           
        </Card>
    )
}

export default FormularioLogin;