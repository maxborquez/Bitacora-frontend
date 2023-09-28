import { Person } from "@mui/icons-material";
import { Grid, Typography,Box ,Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper} from "@mui/material"

const DatosPersonales = ({data})=>{
    
    return (
        <Grid sx={{width:"100%"}}>
            <TableContainer component={Paper} sx={{ maxWidth: '90%',margin:"0px auto",marginTop:"15px", boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)' }}>
                        <Table>
                        <TableHead sx={{ width: "100%", textAlign: "center" }}>
                        <TableRow>
                            <TableCell colSpan={2}>
                            <Typography variant="subtitle1" sx={{textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center", color: "black", transition: "all 1000ms", ':hover': { color: "black" } }}>Datos Personales <Person style={{marginLeft:"5px"}} /></Typography>
                            </TableCell>
                        </TableRow>
                        </TableHead>
                            <TableBody>
                            
                                    <TableRow>
                                        <TableCell >
                                                <strong>Primer Nombre:</strong> {data.primer_nombre}
                                        </TableCell>
                                        <TableCell >
                                                <strong>Segundo Nombre:</strong> {data.segundo_nombre}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell >
                                                <strong>Apellido Paterno: </strong>
                                                {data.apellido_paterno}
                                        </TableCell>
                                        <TableCell >
                                                   <strong>Apellido Materno: </strong>
                                                   {data.apellido_materno}
                                            </TableCell>
                                    </TableRow>
                                    <TableRow>
                                            <TableCell >
                                                <strong>Correo Institucional: </strong>
                                                {data.correo_institucional}
                                    
                                        </TableCell>
                                        <TableCell >
                                                <strong>Correo Personal: </strong>
                                                {data.correo_personal}
                                               
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell >
                                                <strong>Dirección Académica: </strong>
                                                {data.direccion_academica}
                                              
                                        </TableCell>
                                        <TableCell >
                                                <strong>Dirección Particular: </strong>
                                                {data.direccion_particular}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                                <strong>Teléfono Personal: </strong>
                                                {data.telefono_personal}
                                        </TableCell>
                                        <TableCell>
                                                <strong>Teléfono familiar: </strong>
                                                 {data.telefono_familiar}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                                <strong>Carrera: </strong>
                                                {data.carrera.nombre_carrera}
                                        </TableCell>
                                    </TableRow>
                                    

                               
                            </TableBody>
                        </Table>
                    </TableContainer>
        </Grid>
    )
}

export default DatosPersonales;