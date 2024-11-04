import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { InicioSesion, PaginaNoPermitida, PaginaNoEncontrada } from "eco-unp/ui";
import { ProtectedRoote as RutasProtegidas } from "eco-unp/utils";
import Solicitud from "./tabs/Solicitudes";

const App = () => {
 
 
  return (
    <Router>
        <Routes>
          <Route path="/" element={<InicioSesion />} />

          <Route element={<RutasProtegidas />}>
            <Route path="/oaj/gdj/bandeja-recurso-reposicion" element={<Solicitud />} />
            <Route path="/oaj/gdj/proyeccion-recurso-reposicion" element={<Solicitud/>} />
          </Route>

          <Route path="/sistema/pagina-no-permitida" element={<PaginaNoPermitida />} />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>

    </Router>
  );
};
 
export default App;