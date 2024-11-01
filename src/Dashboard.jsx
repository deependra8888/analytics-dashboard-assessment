/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import VehicleModelDistribution from './components/VehicleModelDistribution';

export default function Dashboard({ data }) {
    return (
        <div style={{ width: '100%', height: '100%', border: '1px solid black' }}>
            <VehicleModelDistribution data={data} />
        </div>
    );
}
