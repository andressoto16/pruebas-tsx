import React, { useEffect, useState } from "react";

interface RegistroProps {
    registro: number | null;
}

interface Nombre {
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
}

interface Identificacion {
    tipo_identificacion: string;
    numero_identificacion: string;
    abreviatura_identificación: string;
    fecha_expedicion: string;
}

interface RegistroData {
    registro: number;
    nombre: Nombre;
    identificacion: Identificacion;
}

const Registro: React.FC<RegistroProps> = ({ registro }) => {

    const [data, setData] = useState<RegistroData[]>([]);
    const [registroData, setRegistroData] = useState<RegistroData | null>(null);

    useEffect(() => {
        fetch('/ejemplo2.json')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error al cargar ejemplo2.json:', error));
    }, []);

    useEffect(() => {
        if (registro !== null) {
            const foundData = data.find(item => item.registro === registro);
            setRegistroData(foundData || null);
        }
    }, [registro, data]);

    if (!registroData) {
        return <p>No se encontró el registro.</p>;
    }

    const { nombre, identificacion } = registroData;

    return (
        <div>
            <h3>Registro: {registro}</h3>
            <p>Nombre Completo: {nombre.primer_nombre} {nombre.segundo_nombre} {nombre.primer_apellido} {nombre.segundo_apellido}</p>
            <p>Tipo de Identificación: {identificacion.tipo_identificacion}</p>
            <p>Número de Identificación: {identificacion.numero_identificacion}</p>
            <p>Abreviatura: {identificacion.abreviatura_identificación}</p>
            <p>Fecha de Expedición: {identificacion.fecha_expedicion}</p>
        </div>
    );
};

export default Registro;