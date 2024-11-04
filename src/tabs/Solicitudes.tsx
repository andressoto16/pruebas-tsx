import React from "react";
import IconTooltip from "../components/botonTooltip";
import Registro from "../modals/solicitudes/Registro";
import Radicado from "../modals/solicitudes/Radicado";
import Nuip from "../modals/solicitudes/Nuip";
import { TabVentana, VentanaUsuario, BootstrapTable } from "eco-unp/ui";
import { useFetchData, useColumns } from "eco-unp/utils";

const Solicitud: React.FC = () => {

    const url = '/ejemplo.json';
    const { data } = useFetchData(url);

    const columns = useColumns(url, [
        { label: 'Solicitud', renderComponent: (rowData: any) => <IconTooltip solicitud={rowData.solicitud} /> },
        { key: 'registro', label: 'Registro', hasModal: true },
        { label: 'Radicado', hasModal: true },
        { label: 'Días Hábiles' },
        { label: 'Nombre completo' },
        { label: 'Nuip', hasModal: true },
        { label: 'Género' },
        { label: 'Celular o teléfono' },
        { label: 'Correo' },
        { label: 'Departamento' },
        { label: 'Municipio' },
    ], ['zona']);

    const renderModalContent = (row: Record<string, any>, column: any) => {
        switch (column.key) {
            case "registro":
                return (<Registro registro={10032} />);
            case "nuip":
                return (<Nuip registro={10032} />);
            case "ext":
                return (<Radicado />);
            default:
                return <p>No hay información adicional disponible.</p>;
        }
    };

    return (
        <VentanaUsuario>
            <TabVentana eventKey="Recursos" title="Recursos">
                <BootstrapTable
                    columns={columns}
                    data={data}
                    totalDias={100}
                    renderModalContent={renderModalContent}
                    subtitle={'Oficina Asesora Jurídica (OAJ)'}
                    items={'Recursos de Reposición'}
                />
            </TabVentana>
        </VentanaUsuario>
    );
};

export default Solicitud;