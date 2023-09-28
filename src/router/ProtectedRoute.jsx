
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";





export const ProtectedRoute = ({children,redirectTo="/"})=>{
    let rol = "";
    const {user} = useContext(AuthContext);
    if(user){
        localStorage.setItem("rol",user.rol);
        rol = user.rol;
        if(!rol==1){
            return <Navigate to={redirectTo}/>
        }
        return <Outlet/>
    } //Cuando se cae el context
    rol = localStorage.getItem("rol");
    if(!rol==1){
        return <Navigate to={redirectTo}/>
    }
    return <Outlet/>
    
}