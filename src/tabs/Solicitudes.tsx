import React from "react";
import { useFetchData, useColumns } from "../hooks/useHook";
import IconTooltip from "../components/botonTooltip";
import { BootstrapTable } from "../provisionals/Tabla";
import TituloTab from "../components/TituloTab";
import Registro from "../modals/solicitudes/Registro";
import Radicado from "../modals/solicitudes/Radicado";
import Nuip from "../modals/solicitudes/Nuip";

const Solicitud: React.FC = () => {

    const url = '/ejemplo.json'; 
    const { data } = useFetchData(url);

    const [selectedRegistro, setSelectedRegistro] = React.useState<number | null>(null);

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

    const handleCellClick = (key: string, row: Record<string, any>) => {
        setSelectedRegistro(row.registro);
    };

    const renderModalContent = (row: Record<string, any>, column: any) => {
        switch (column.key) {
            case "registro":
                return (<Registro registro={selectedRegistro} />);
            case "nuip":
                return (<Nuip registro={selectedRegistro} />);
            case "ext":
                return (<Radicado />);
            default:
                return <p>No hay información adicional disponible.</p>;
        }
    };

    return (
        <>  
            <div className="d-flex justify-content-between align-items-center" style={{marginTop: '20px'}}>
                <TituloTab title={'Solicitudes por tramitar'}/>
            </div>

            <BootstrapTable
                columns={columns}
                data={data}
                totalDias={5}
                renderModalContent={renderModalContent}
                onCellClick={handleCellClick}
            />
        </>
    );
};

export default Solicitud;