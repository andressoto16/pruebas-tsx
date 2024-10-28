import React from "react";
import TituloTab from "../components/TituloTab";

const Asignacion: React.FC = () => {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center" style={{ marginTop: '20px' }}>
                <TituloTab title={'Asignaciones por tramitar'} />
            </div>
        </>
    );
};

export default Asignacion;