import React from "react";

interface CustomColumn {
    label: string;
    hasModal?: boolean;
    renderComponent?: (rowData: any) => React.ReactNode;
    key ?: string;
}


const useFetchData = (url: string) => {
    
    const [data, setData] = React.useState<any[]>([]);

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
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [url]);

    return { data };
};

const useColumns = (url: string, customColumns: CustomColumn[] = [], excludeColumns: string[] = []) => {

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

                    const keys = Object.keys(data[0]).filter(key => !excludeColumns.includes(key));
                    const generatedColumns = keys.map((key, index) => {

                        const customColumn = customColumns[index] || {};

                        return {
                            key,
                            label: 'label' in customColumn ? customColumn.label : key,
                            hasModal: 'hasModal' in customColumn ? customColumn.hasModal : false,
                            renderComponent: 'renderComponent' in customColumn ? customColumn.renderComponent : undefined,
                        };

                    });

                    setColumns(generatedColumns);
                }
            })

            .catch(error => {
                console.error('Error:', error);
            });

    }, [url, customColumns, excludeColumns]);

    return columns;
};

export { useFetchData, useColumns };