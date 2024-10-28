import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsArrowUpCircleFill, BsExclamationCircleFill, BsFillAwardFill, BsArrowRepeat } from 'react-icons/bs';

interface IconTooltipProps {
    solicitud: number;
}

const IconTooltip: React.FC<IconTooltipProps> = ({ solicitud }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    // Manejo del tooltip según el tipo de solicitud
    let tooltipText = '';
    let variant = '';
    let Icon = null;

    switch (solicitud) {
        case 1:
            tooltipText = "Por primera vez";
            variant = "success";
            Icon = BsArrowUpCircleFill;
            break;
        case 2:
            tooltipText = "Medida de Emergencia";
            variant = "danger";
            Icon = BsExclamationCircleFill;
            break;
        case 3:
            tooltipText = "Caso Jurídico";
            variant = "secondary";
            Icon = BsFillAwardFill;
            break;
        case 4:
            tooltipText = "Reasignación";
            variant = "warning";
            Icon = BsArrowRepeat;
            break;
        default:
            return null;
    }

    // Funciones para mostrar y ocultar el tooltip
    const handleMouseEnter = () => setShowTooltip(true);
    const handleMouseLeave = () => setShowTooltip(false);

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <Button
                variant={variant}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ position: "relative", zIndex: 1 }} // Asegura que el botón esté por encima de otros elementos
            >
                <Icon />
            </Button>
            {showTooltip && (
                <div
                    style={{
                        position: "absolute",
                        top: "50%", // Ajusta la posición vertical al centro del ícono
                        left: "110%", // Posiciona el tooltip a la derecha del ícono
                        transform: "translateY(-50%)", // Centra el tooltip verticalmente
                        backgroundColor: "#333",
                        color: "#fff",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        fontSize: "0.9em",
                        whiteSpace: "nowrap",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)", // Sombra para mayor visibilidad
                        opacity: showTooltip ? 1 : 0, // Transición de opacidad
                        visibility: showTooltip ? "visible" : "hidden", // Manejo de visibilidad
                        zIndex: 1000, // Asegúrate de que esté por encima de otros elementos
                        transition: "opacity 0.3s ease, visibility 0.3s ease",
                    }}
                >
                    {tooltipText}
                </div>
            )}
        </div>
    );
};

export default IconTooltip;
