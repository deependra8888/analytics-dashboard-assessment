import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';

const VehicleDataTable = ({ data }) => {
    const [columnDefinations, setColumnDefinations] = useState(null)

    const getRowId = (params) => {
        return params?.data['DOL Vehicle ID']
    }

    useEffect(() => {
        if (data) {
            setColumnDefinations([
                {
                    field: "Make", sortable: true, filter: true, valueGetter: (params) => {
                        if (!params || !params?.data) {
                            return
                        }
                        return params.data['Make'].slice(0, 1).toUpperCase() + params.data['Make'].slice(1).toLowerCase()
                    }
                },
                { field: "Model", sortable: true, filter: true },
                { field: "Model Year", sortable: true, filter: true },
                {
                    field: "Electric Range", sortable: true, filter: true, valueGetter: (params) => {
                        if (!params || !params?.data) {
                            return
                        }
                        const numVal = Number(params.data["Electric Range"])
                        return numVal
                    }
                },
                {field : 'City', sortable: true, filter: true},
                {field : 'County', sortable: true, filter: true},
            ])
        }
    }, [data])
    return (
        // wrapping container with theme & size
        <div style={{ padding: '20px', width: '100%' }}>
            <div
                className="ag-theme-material-dark" // applying the Data Grid theme
                style={{ height: 500, border: '1px solid lightgrey' }} // the Data Grid will fill the size of the parent container
            >
                <AgGridReact
                    rowData={data}
                    columnDefs={columnDefinations ? columnDefinations : []}
                    getRowId={getRowId}
                    pagination={true} 
                    paginationPageSize={10} 
                />
            </div>
        </div>
    )
}

export default VehicleDataTable