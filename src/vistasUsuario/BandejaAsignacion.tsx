import React from "react";
import { TabVentana, VentanaUsuario } from "eco-unp/ui";
import Solicitud from "../tabs/Solicitudes";
import Asignacion from "../tabs/Asignaciones";

const BandejaAsignacion: React.FC = () => {
    
    return(
    <VentanaUsuario>
        <TabVentana eventKey="solicitudes" title="Solicitudes">
            <Solicitud />
        </TabVentana>
        
        <TabVentana eventKey="asignaciones" title="Asignaciones">
            <Asignacion />
        </TabVentana>
        
        <TabVentana eventKey="" title="">
            <></>
        </TabVentana>
    </VentanaUsuario>

)};

export default BandejaAsignacion;