import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { BusquedaInput } from './buscador';
import { CustomModal } from './modal';
import '../styles/tabla.css';

interface Column {
    key: string;
    label: string;
    hasModal?: boolean;
    renderComponent?: (row: Record<string, any>) => React.ReactNode;
}

interface TableProps {
    columns: Column[];
    data: Array<Record<string, any>>;
    totalDias?: number;
    renderModalContent?: (row: Record<string, any>, column: Column) => React.ReactNode;
    onCellClick?: (columnKey: string, cellValue: any) => void;
}


const getCurrentYear = (): number => {
    return new Date().getFullYear();
};

//
const BootstrapTable: React.FC<TableProps> = ({ columns, data, renderModalContent, totalDias, onCellClick }) => {

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [modalData, setModalData] = useState<{ row: Record<string, any>, column: Column } | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [visibleData, setVisibleData] = useState<number>(10); // Inicialmente, muestra 10 elementos
    const [hasMoreData, setHasMoreData] = useState<boolean>(true);
    const [filteredCount, setFilteredCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    const currentYear = getCurrentYear();
    const [showMessage, setShowMessage] = useState(false);

    const filteredData = data.filter(row =>
        columns.some(column =>
            String(row[column.key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    React.useEffect(() => {
        setFilteredCount(filteredData.length);
        setHasMoreData(filteredData.length > 10);
        setIsLoading(false);
    }, [filteredData]);

    React.useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => {
                setShowMessage(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 50 && hasMoreData) {
            setVisibleData(prev => {
                const newVisibleData = prev + 1; // Aumenta el número de elementos visibles
                if (newVisibleData >= filteredData.length) {
                    setHasMoreData(false); // No hay más datos para cargar
                }
                return newVisibleData;
            });
        } else if (scrollTop < 50 && visibleData > 10) {
            setVisibleData(prev => {
                const newVisibleData = prev - 1; // Disminuye el número de elementos visibles
                if (newVisibleData < 10) {
                    return 10; // Asegura que al menos 10 elementos sean visibles
                }
                return newVisibleData;
            });
        }
    };

    const handleCellClick = (column: Column, row: Record<string, any>) => {
        if (column.hasModal && renderModalContent) {
            setModalData({ row, column });
            setShowModal(true);
        }

        if (onCellClick) {
            onCellClick(column.key, row);
        }
    };

    const getBackgroundColor = (diasHabiles: number) => {
        if (totalDias) {
            const porcentaje = (diasHabiles / totalDias) * 100;
            if (porcentaje <= 25) return '#CBFDBD';
            if (porcentaje <= 50) return '#ffffd4';
            if (porcentaje <= 75) return '#FFEBD0';
            return '#FFD0D3';
        }
        return 'transparent';
    };

    // ----------------------> Renderización
    return (

        <>
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ padding: '2rem' }}>
                    <img src="/loading.gif" alt="loading" />
                </div>
            ) : (

                <>
                    {data.length > 0 ? (
                        <div className='table_container'>

                            <div className='unp-row'>
                                <BusquedaInput onSearch={setSearchTerm} />
                            </div>

                            <>
                                {filteredData.length > 0 ? (
                                    <>
                                        <div
                                            className='table-scroll'
                                            onScroll={handleScroll}
                                            style={{ position: 'relative', maxHeight: '64.2vh', overflowY: 'auto', overflowX: 'auto' }}
                                        >
                                            <Table striped hover>
                                                <thead>
                                                    <tr>
                                                        {columns.map((column, index) => (
                                                            <th key={index}>{column.label}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredData.slice(0, visibleData).map((row, rowIndex) => (
                                                        <tr key={rowIndex}>
                                                            {columns.map((column, colIndex) => (
                                                                <td
                                                                    key={colIndex}
                                                                    onClick={() => handleCellClick(column, row)}
                                                                    style={{
                                                                        cursor: column.hasModal ? 'pointer' : 'default',
                                                                        backgroundColor: column.key === 'dias_habiles'
                                                                            ? getBackgroundColor(row.dias_habiles)
                                                                            : 'transparent',
                                                                    }}
                                                                    className={column.hasModal ? 'cell-with-modal' : ''}
                                                                >
                                                                    {column.renderComponent
                                                                        ? column.renderComponent(row)
                                                                        : row[column.key]}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}

                                                    {visibleData < filteredData.length && (
                                                        <tr>
                                                            <td colSpan={columns.length} className="text-center">
                                                                Cargando más datos...
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </Table>
                                        </div>

                                        <div className='d-flex justify-content-between'>
                                            <div className='data-unp'>
                                                {currentYear} • Unidad Nacional de Protección — UNP
                                            </div>
                                            <div className='data-count'>
                                                Mostrando {Math.min(visibleData, filteredCount)} de {data.length} registros
                                            </div>
                                        </div>
                                    </>
                                ) : (searchTerm && (
                                    <div className="d-flex justify-content-center align-items-center flex-column" style={{ padding: '2rem' }}>
                                        <img src="/search.gif" alt="search" />
                                        <p style={{ width: '250px', padding: '10px', color: 'darkgray' }}>No se encontró registro con el criterio de búsqueda definido</p>
                                    </div>
                                ))}
                            </>

                            {modalData && renderModalContent && (
                                <CustomModal
                                    show={showModal}
                                    onHide={() => setShowModal(false)}
                                    title={`${modalData.column.label}`}
                                >
                                    {renderModalContent(modalData.row, modalData.column)}
                                </CustomModal>
                            )}

                        </div>
                    ) : (showMessage && (
                        <div className="d-flex justify-content-center align-items-center flex-column" style={{ padding: '2rem', borderTop: '1px solid #DEE2E6', marginTop: '3rem', borderBottom: '1px solid #DEE2E6', }}>
                            <img src="/task.gif" alt="task" style={{ width: '180px' }} />
                            <p style={{
                                width: '400px',
                                fontWeight: '600',
                                padding: '0px',
                                color: '#303D50',
                                textAlign: 'center'
                            }}
                            >
                                No existen solicitudes pendientes por tramitar
                            </p>
                        </div>
                    ))}

                </>
            )}
        </>
    );
};

export { BootstrapTable };