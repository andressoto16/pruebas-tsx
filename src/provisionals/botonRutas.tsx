import React from 'react';

interface BotonRutasProps {
    toggleComponent: () => void; // Cambiamos esto para que acepte la función de alternar
    isColectivo: boolean; // Estado para mostrar el texto correcto en el botón
}

export const BotonRutas: React.FC<BotonRutasProps> = ({ toggleComponent, isColectivo }) => {
    return (
        <div className='unp-row'>
            <div>
                {isColectivo ? (
                    <span className='subtitle'>Ruta colectiva</span>
                ) : (
                    <span className='subtitle'>Ruta individual</span>
                )}
            </div>
            <button onClick={toggleComponent} className="btn custom-button">
                {isColectivo ? (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                        Individuales
                    </>
                ) : (

                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                        </svg>
                        Colectivas
                    </>
                )}
            </button>
        </div>
    );
};




