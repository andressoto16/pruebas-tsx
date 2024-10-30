import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { InicioSesion } from "eco-unp/ui";
import Solicitud from "./tabs/Solicitudes";

const App = () => {
 
 
  return (
    <Router>
        <Routes>
          <Route path="/" element={<InicioSesion />} />  
          <Route path="/oaj/gdj/bandeja-recurso-reposicion" element={<Solicitud />} />
        </Routes>
    </Router>
  );
};
 
export default App;