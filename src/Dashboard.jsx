/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import StockPrices from './components/StockPrices';
import VehicleModelDistribution from './components/VehicleModelDistribution';
import VehicleTypeDistribution from './components/VehicleTypeDistribution';
import VehicleDataTable from './components/VehicleDataTable';

export default function Dashboard({ data }) {

    return (
        <div style={{ width: '100%', height: '100%', border: '1px solid black' }}>
            
            <VehicleModelDistribution data={data} />
            <VehicleTypeDistribution data={data} />
            <StockPrices data={data} />
            <VehicleDataTable data={data}/>
        </div>
    );
}
