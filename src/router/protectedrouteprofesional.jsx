import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";




export const ProtectedRouteProfesional = ({children,redirectTo="/"})=>{
    let rol = "";
    const {user} = useContext(AuthContext);
    //Cuando Inicia
    if(user){
        localStorage.setItem("rol",user.rol);
        rol = user.rol;
        if(!rol==3){
            return <Navigate to={redirectTo}/>
        }
        return <Outlet/>
    }
    //Cuando se cae el context
    rol = localStorage.getItem("rol");
    if(!rol==3){
        return <Navigate to={redirectTo}/>
    }
    return <Outlet/>
}