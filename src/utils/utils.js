export function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');

    const data = lines.slice(1).map((line) => {
        const values = line.split(',');
        return headers.reduce((obj, header, index) => {
            obj[header.trim()] = values[index].trim();
            return obj;
        }, {});
    });

    return data;
}

export function calculateAverageRangeByYear(vehicleDataList) {
    const yearDataForBEV = {};
    const yearDataForPHEV = {};

    vehicleDataList.forEach((vehicle) => {
        const year = vehicle['Model Year'];
        const range = parseInt(vehicle['Electric Range'], 10);
        if (range > 0) {
            // console.log(`Year: ${year} | Make: ${vehicle['Make']} | Model: ${vehicle['Model']} | Range: ${range}`);
            if (!yearDataForBEV[year]) {
                yearDataForBEV[year] = { totalRange: 0, count: 0 };
            }
            if (!yearDataForPHEV[year]) {
                yearDataForPHEV[year] = { totalRange: 0, count: 0 };
            }
            if (vehicle['Electric Vehicle Type'] === 'Battery Electric Vehicle (BEV)') {
                yearDataForBEV[year].totalRange += range;
                yearDataForBEV[year].count += 1;
            }
            if (vehicle['Electric Vehicle Type'] === 'Plug-in Hybrid Electric Vehicle (PHEV)') {
                yearDataForPHEV[year].totalRange += range;
                yearDataForPHEV[year].count += 1;
            }
        }
    });

    let data1 = Object.keys(yearDataForBEV).map((year) => ({
        year: year,
        range: Number((yearDataForBEV[year].totalRange / yearDataForBEV[year].count).toFixed(2)),
        category: 'Battery Electric Vehicle (BEV)',
    }));

    let data2 = Object.keys(yearDataForPHEV).map((year) => ({
        year: year,
        range: Number((yearDataForPHEV[year].totalRange / yearDataForPHEV[year].count).toFixed(2)),
        category: 'Plug-in Hybrid Electric Vehicle (PHEV)',
    }));

    // data.sort((a, b) => a.year - b.year);

    return [...data1, ...data2];
}
