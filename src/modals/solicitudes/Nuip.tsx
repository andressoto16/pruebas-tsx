import React, { useEffect, useState } from "react";

interface RegistroProps {
    registro: number | null;
}

const Nuip: React.FC<RegistroProps> = ({ registro }) => {
    const [pdfPath, setPdfPath] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetching data...");
                const response = await fetch('/ejemplo2.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Data fetched:", data);

                // Filtrar el PDF basado en el valor de registro
                if (data.registro === registro) {
                    setPdfPath(data.identificacion.copia_identificacion);
                    console.log("PDF path set:", data.identificacion.copia_identificacion);
                } else {
                    setPdfPath("");
                    console.log("No matching registro found.");
                }
            } catch (error) {
                console.error("Error al leer el archivo JSON:", error);
            }
        };

        fetchData();
    }, [registro]);

    return (
        <div>
            {registro ? (
                pdfPath ? (
                    <iframe src={'file:///C:/Users/Nykona/Desktop/prueba-tsx/public/cedula-ejemplo.pdf'} width="100%" height="500px" />
                ) : (
                    <p>Cargando PDF...</p>
                )
            ) : (
                <p>No hay registro disponible.</p>
            )}
        </div>
    );
}

export default Nuip;