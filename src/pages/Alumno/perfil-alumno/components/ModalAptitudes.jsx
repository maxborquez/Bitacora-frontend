import { Box, Button, Typography,Modal, Grid, FormGroup, FormControlLabel, Checkbox, Select, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";
import clienteAxios from "../../../../helpers/clienteaxios";
import Swal from "sweetalert2";


const ModalAptitudes = ({id_alumno})=>{

  
  
    const {handleSubmit,register,control} = useForm();

    const { data, status, refetch } = useQuery(
        "aptitudes",
        async () => {
          const response = await clienteAxios.get("/aptitud/getall");
          const response2 = await clienteAxios.post("/alumno/showAptitudes", {
            id_alumno: id_alumno,
          });
          
          const array_aptitudes = response.data.aptitudes;
          const array_conocimientos = response2.data.aptitudes;
          const optionsNotRegistered = array_aptitudes.filter(
            (option) => !array_conocimientos.some((item) => item.id_aptitud === option.id_aptitud)
          );
    
          return optionsNotRegistered;
        }
      );
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const queryClient = useQueryClient()
    const onSubmit = async(data)=>{
       
        const response = await clienteAxios.post("/conocimiento/create",{
            id_alumno:Number(id_alumno),
            id_aptitud:data.id_aptitud
        })
        if(response.status == 200){
            Swal.fire({
                title:"Regitrado",
                text:"Conocimento registrado correctamente",
                icon:"success",
                confirmButtonText:"Aceptar"
            })
            setTimeout(()=>{
                Swal.close();
                setOpen(false)
                refetch();
                queryClient.refetchQueries("misapitudes")
            },2000)
        }
    }
    if(status=="success"){
    
        return (
            <>
                <Button variant="contained" onClick={handleOpen}  sx={{width:"250px",margin:"0px auto",marginBottom:"15px", marginTop:"10px"}} >Ingresar conocimiento</Button>
                <Modal sx={{zIndex:2}} open={open}  onClose={handleClose}>
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
                            overflow:"auto",
                            p: 4,
                            }}
                        >
                            <Typography variant="h5" sx={{textAlign:"center"}}>Añadir conocimientos </Typography>
                        
                            <form onSubmit={handleSubmit(onSubmit)} style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                                <Controller
                                    name="id_aptitud"
                                    control={control}
                                    defaultValue=""
                            
                                    rules={{ required: 'Este campo es obligatorio' }}
                                    render={({ field, fieldState }) => (
                                    <Select {...field} displayEmpty fullWidth required>
                                         <MenuItem value="" disabled>
                                            Selecciona una opción
                                            </MenuItem>
                                        { Array.isArray(data) && data.map((option,idx) => (
                                        <MenuItem key={idx} value={option.id_aptitud}>
                                            {option.nombre_aptitud}
                                        </MenuItem>
                                        ))}
                                    </Select>
                                    )}
                                />
                                <Button variant="contained" sx={{width:"40%",marginTop:"10px"}} type="submit">Enviar datos</Button>
                             
                                </form>
                        </Box>
                    </Modal>
            </>
        )
    }
   
}

export default ModalAptitudes;