import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom'
import { AuthContext, AuthProvider } from './context/AuthContext'
import Login from './pages/login/login'
import DashboardAlumno from './pages/Alumno/Dashboard'
import PublicRoutes from './router/publicRoutes'
import PrivateRoutes from './router/privateRoutes'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ProtectedRoute } from './router/ProtectedRoute'

import { ProtectedRouteProfesional } from './router/protectedrouteprofesional'
import DashboardProfesional from './pages/ProfesionalApoyo/dashboardProfesional/DashboardProfesional'
import PerfilAlumno from './pages/Alumno/perfil-alumno/PerfilAlumno'
import DetalleOfertaPractica from './pages/Alumno/detalleofertapractica/detalleofertapractica'
import DetalleInscripcion from './pages/Alumno/detalleInscripcion/DetalleInscripcion'
import ModificarDatos from './pages/Alumno/inscripcion_practica/modificarDatos'
import DocumentosInscripcion from './pages/Alumno/documentos/documentosInscripcion'
import ArchivosBitacoras from './pages/Alumno/archivos_bitacora/Archivos_bitacoras'
import ImagenesBitacoras from './pages/Alumno/imagenesBitacora/imageneBitacoras'
import Aptitudes from './pages/Alumno/aptitudes/aptitudes'
import BitAlumnoRender from './pages/Alumno/BitacoraAlumno/CreateBitacoAlumno/BitaAlumnoRender'
import RenderBitaAlumno from './pages/Alumno/BitacoraAlumno/ShowBitaAlum/RenderBitaAlumno'
import RenderDetailsAlumno from './pages/Alumno/BitacoraAlumno/DetailsAlumno/RenderDetailsAlumno'
import EditingBitAlumno from './pages/Alumno/BitacoraAlumno/ModificarAlumno/EditingBitAlumno'
import InscripcionPractica from './pages/Alumno/inscripcion_practica/inscripcionPractica'
import Empresas from './pages/ProfesionalApoyo/dashboardProfesional/empresas'
import ModificarEmpresa from './pages/ProfesionalApoyo/dashboardProfesional/empresas/modificar_empresa'
import OfertaPractica from './pages/ProfesionalApoyo/dashboardProfesional/ofertas_practica/ofertapractica'
import CrearOferta from './pages/ProfesionalApoyo/dashboardProfesional/ofertas_practica/components/crear_oferta'
import ModificarOferta from './pages/ProfesionalApoyo/dashboardProfesional/ofertas_practica/components/modificarOferta'
import EstadoPracticas from './pages/ProfesionalApoyo/dashboardProfesional/estado_practicas/estado_practicas'
import InformacionGeneral from './pages/ProfesionalApoyo/dashboardProfesional/estado_practicas/informacion_general_practica'
import VerDocumentosInscripcion from './pages/ProfesionalApoyo/dashboardProfesional/estado_practicas/verdocumentosinscripcion'
import EvaluarPractica from './pages/ProfesionalApoyo/dashboardProfesional/estado_practicas/evaluarPractica'
import AptitudesAlumno from './pages/ProfesionalApoyo/dashboardProfesional/aptitudes_alumno/AptitudesAlumno'
import BitacorasAlumno from './pages/ProfesionalApoyo/dashboardProfesional/bitacoras_alumno/bitacorasAlumno'
import DetalleBitacora from './pages/ProfesionalApoyo/dashboardProfesional/bitacoras_alumno/detalleBitacora'
import VerArchivos from './pages/ProfesionalApoyo/dashboardProfesional/bitacoras_alumno/verArchivos'
import VerImagenes from './pages/ProfesionalApoyo/dashboardProfesional/bitacoras_alumno/verImagenes'
import VisualizadorDocumento from './pages/Alumno/documentos/visualizadorDocumento'
import VisualizadorDocumentosInscripcion from './pages/ProfesionalApoyo/dashboardProfesional/estado_practicas/visualizadorDocumentos'
import VisualizadorDocumentoBitacora from './pages/Alumno/archivos_bitacora/visualizador_archivo_bitacora'
import IngresarEmpresa from "./pages/ProfesionalApoyo/dashboardProfesional/empresas/ingresar_empresa";
import EmpresaAlumno from "./pages/Alumno/empresa/empresa_alumno";
import InscripcionesPendientes from "./pages/ProfesionalApoyo/dashboardProfesional/inscripciones_pendientes/ins_pendientes";

const queryClient = new QueryClient();

function App() {
    
    
    return(
      <BrowserRouter>
        <QueryClientProvider client={queryClient} >
          
              <AuthProvider>
                     <Routes>
                            <Route path='/' index element={<Login/>} />
                             <Route path='/visualizadorbitacora/:id' element={<VisualizadorDocumentoBitacora/>} />
                             <Route path='/visualizador/:id' element={<VisualizadorDocumento/>}/>
                             <Route element={<ProtectedRoute />}>
                                <Route path="/alumno" element={<DashboardAlumno/>} /> 
                                <Route path="/perfil" element={<PerfilAlumno/>} />
                                <Route path="/detalleoferta/:id" element={<DetalleOfertaPractica/>} />
                                <Route path="/detalleinscripcion/:id" element={<DetalleInscripcion/>}/>
                                <Route path="/inscripcionpractica/:id" element={<InscripcionPractica/>} />
                            
                                <Route path="/modificarinscripcion/:id" element={<ModificarDatos/>} />
                                <Route path="/documentosinscripcion/:id" element={<DocumentosInscripcion/>} />
                                <Route path="/archivosbitacora/:id" element ={<ArchivosBitacoras/>} />
                                <Route path="/imagenesbitacora/:id" element={<ImagenesBitacoras/>} />
                                <Route path="/aptitudes" element={<Aptitudes/>} />
                                <Route path="/bitacoralumno" element={<BitAlumnoRender />} />
                                <Route path="/showbitalumno/:id" element={<RenderBitaAlumno/>} />
                                <Route path="/detailsbitacoralumno/:id" element={<RenderDetailsAlumno/>} />
                                <Route path="/modificarbitacoralumno/:id" element={<EditingBitAlumno/>} />
                                
                            </Route>  
                            <Route element={<ProtectedRouteProfesional/>}>
                          
                                <Route path="/dashboard" element={<DashboardProfesional/>} />
                                <Route path="/ins_pendientes" element={<InscripcionesPendientes/>} />
                                <Route path="/empresa_alumno" element={<EmpresaAlumno/>} />
                                <Route path="/empresas" element={<Empresas/>} />
                                <Route path="/ingresar_empresa" element={<IngresarEmpresa/>} />
                                <Route path="/modificarEmpresa/:id" element={<ModificarEmpresa/>} />
                                <Route path="/ofertapracticas" element={<OfertaPractica/>} />
                                <Route path="/crearoferta" element={<CrearOferta/>} />
                                <Route path="/modificaroferta/:id" element={<ModificarOferta/>} />
                                <Route path="/estadopracticas/:anio/:periodo/:asignatura/:carrera" element={<EstadoPracticas/>}/>
                                <Route path="/informaciongeneral/:inscribe" element={<InformacionGeneral/>} />
                                <Route path="/documentosinscripcionpractica/:id" element={<VerDocumentosInscripcion/>} />

                                <Route path="/evaluarinscripcion/:id" element={<EvaluarPractica/>} />
                                <Route path="/aptitudes/:id" element={<AptitudesAlumno/>} />
                                <Route path="/bitacoras/:id" element={<BitacorasAlumno/>} />
                                <Route path="/detallebitacora/:id" element={<DetalleBitacora/>} />
                                <Route path='/verarchivobitacoras/:id' element={<VerArchivos/>} />
                                <Route path='/verimagenesbitacoras/:id' element={<VerImagenes/>} />
                                <Route path='/visualizadordocumento/:id' element={<VisualizadorDocumentosInscripcion/>} />
                            </Route>
                        
                     </Routes>
                   
              </AuthProvider>
           
          </QueryClientProvider>
         
        </BrowserRouter>
      )
 
   
}

export default App
