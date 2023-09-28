import { createContext, useState } from "react";

import clienteAxios from "../helpers/clienteaxios";
import { setToken } from "../helpers/tokenUtilities";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const navigate = useNavigate();
    const [user,setUser] = useState(null);

    const login = async (rut,password)=>{
        try{
            const response = await clienteAxios.post("/auth/login",{rut,contrasena:password});
    
            if(response.status==200){
                switch(response.data.rol){
                    case 1:{
                        const userData = response.data;
                       
                        setToken(response.data.token);
                        localStorage.setItem("user",response.data);
                        localStorage.setItem("rol",response.data.rol);
                        localStorage.setItem("rut",response.data.alumno.rut);
                        localStorage.setItem("id_alumno",response.data.alumno.id_alumno)
                        localStorage.setItem("id_inscribe",response.data.id_inscribe)
                        localStorage.setItem("id_inscripcion_practica",response.data.id_inscripcion_practica)
                        localStorage.setItem("id_usuario",response.data.id_usuario)
                        setUser(userData);
                        
                        Swal.fire(
                            'Iniciando sesión',
                            'Las credenciales son válidas.',
                            'success'
                          )
                        setTimeout(()=>{
                            Swal.close()
                            navigate("/alumno")
                        },3000)
                        break;
                    }
                    case 2:{
                        const userData = response.data;
                        localStorage.setItem("user",response.data);
                        setToken(response.data.token);
                        localStorage.setItem("rol",response.data.rol);
                        localStorage.setItem("id_usuario",response.data.id_usuario)
                        setUser(userData);
                        Swal.fire(
                            'Iniciando sesión',
                            'Las credenciales son válidas.',
                            'success'
                          )
                        setTimeout(()=>{
                            Swal.close()
                            navigate("/jefedecarrera")
                        },3000)
                        break;
                    }
                    case 3:{
                        const userData = response.data;
                        setToken(response.data.token);
                        localStorage.setItem("user",response.data);
                        localStorage.setItem("rol",response.data.rol);
                        localStorage.setItem("rut",response.data.rut);
                        setUser(userData);
                        Swal.fire(
                            'Iniciando sesión',
                            'Las credenciales son válidas.',
                            'success'
                          )
                        setTimeout(()=>{
                            Swal.close()
                            navigate("/dashboard")
                        },3000)
                        break;
                    }
                    case 4:{
                        const userData = response.data;
                        localStorage.setItem("user",response.data);
                        setToken(response.data.token);
                        localStorage.setItem("rol",response.data.rol);
                        localStorage.setItem("id_usuario",response.data.id_usuario)
                        setUser(userData);
                        Swal.fire(
                            'Iniciando sesión',
                            'Las credenciales son válidas.',
                            'success'
                          )
                        setTimeout(()=>{
                            Swal.close()
                            navigate("/jefedecarrera")
                        },3000)
                        break;
                    }
                    
                }
            }
          
        }catch(error){
            console.log(error);
        }
    }
    const logout = ()=>{
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{user,login,logout}} >
            {children}
        </AuthContext.Provider>
    )
   
}

export {AuthContext,AuthProvider};