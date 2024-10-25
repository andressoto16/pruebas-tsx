import React from "react";
import { CustomeTable, TabVentana, VentanaUsuario } from "eco-unp/ui";
import {useFetchData, useColumns } from "../hooks/useHook";
import IconTooltip from "../modals/botonTooltip";

const BandejaCasosLider: React.FC = () => {

    const url = '/ejemplo.json' //Solo modificar esta url

    const { data, loading } = useFetchData(url);
    const columns = useColumns(url, [
        { label: 'Solicitud', renderComponent: (rowData: any) => <IconTooltip solicitud={rowData.solicitud} /> },
        { label: 'Registro', hasModal: true, },
        { label: 'Radicado' },
        { label: 'Días Hábiles'},
        { label: 'Nombre completo' },
        { label: 'Nuip', hasModal: true },
        { label: 'Género' },
        { label: 'Celular o teléfono' },
        { label: 'Correo' },
        { label: 'Departamento' },
        { label: 'Municipio' },
        { label: 'Zona' },
    ]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <VentanaUsuario>
            <TabVentana eventKey="solicitudes" title="Solicitudes">
                <br />
                <br />
                <CustomeTable
                    columns={columns}
                    data={data}
                    totalDias={5}
                />
            </TabVentana>
        </VentanaUsuario>
    );
};

export default BandejaCasosLider;