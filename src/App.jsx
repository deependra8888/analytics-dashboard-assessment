/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import { parseCSV } from './utils/utils';

export default function App() {
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/src/assets/data.csv');
                const csvText = await response.text();
                const parsedData = parseCSV(csvText);
                console.log(parsedData);
                setData(parsedData);
            } catch (error) {
                console.error('Error fetching the CSV file:', error);
            }
        };

        fetchData();
    }, []);

    return <>{data && <Dashboard data={data} />}</>;
}
