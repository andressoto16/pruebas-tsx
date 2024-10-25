import React from "react";

interface CustomColumn {
    label: string;
    hasModal?: boolean;
    renderComponent?: (rowData: any) => React.ReactNode;
}

// 
const useFetchData = (url: string) => {
    
    const [data, setData] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Hubo un error en la red');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, [url]);

    return { data, loading };
};

// 
const useColumns = (url: string, customColumns: CustomColumn[] = []) => {
    const [columns, setColumns] = React.useState<any[]>([]);

    React.useEffect(() => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Hubo un error en la red');
                }
                return response.json();
            })
            .then(data => {
                if (data.length > 0) {
                    const keys = Object.keys(data[0]);
                    const generatedColumns = keys.map((key, index) => {
                        const customColumn = customColumns[index] || {};
                        return {
                            key,
                            label: customColumn.label || '',
                            hasModal: customColumn.hasModal || false,
                            renderComponent: customColumn.renderComponent || undefined,
                        };
                    });
                    setColumns(generatedColumns);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [url, customColumns]);

    return columns;
};

export { useFetchData, useColumns };