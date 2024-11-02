import React, { useEffect } from 'react';

export default function StockPrices({ data }) {
    useEffect(() => {
        fetchStockPrice({ name: 'Tesla', symbol: 'TSLA' });
    }, []);
    return <div>StockPrices</div>;
}

// List of car manufacturers with their corresponding stock symbols
const companies = [
    { name: 'Tesla', symbol: 'TSLA' },
    { name: 'Ford', symbol: 'F' },
    { name: 'Nissan', symbol: 'NSANY' },
    { name: 'Kia', symbol: 'KIMTF' },
    { name: 'BMW', symbol: 'BMWYY' },
    { name: 'Chevrolet', symbol: 'GM' }, // Chevrolet is a brand under General Motors
    { name: 'Audi', symbol: 'VWAGY' }, // Audi is a subsidiary of Volkswagen
    { name: 'Smart', symbol: 'DDAIF' }, // Smart is a division of Daimler AG
    { name: 'Volkswagen', symbol: 'VWAGY' },
    { name: 'Toyota', symbol: 'TM' },
    { name: 'Rivian', symbol: 'RIVN' },
    { name: 'Jeep', symbol: 'STLA' }, // Jeep is a brand under Stellantis
    { name: 'Hyundai', symbol: 'HYMTF' },
    { name: 'Fiat', symbol: 'STLA' }, // Fiat is a brand under Stellantis
    { name: 'Porsche', symbol: 'POAHY' },
    { name: 'Chrysler', symbol: 'STLA' }, // Chrysler is a brand under Stellantis
    { name: 'Honda', symbol: 'HMC' },
    { name: 'Mitsubishi', symbol: 'MSBHF' },
    { name: 'Lexus', symbol: 'TM' }, // Lexus is a luxury division of Toyota
    { name: 'Volvo', symbol: 'VLVLY' },
    { name: 'Dodge', symbol: 'STLA' }, // Dodge is a brand under Stellantis
    { name: 'Mercedes-Benz', symbol: 'MBGYY' },
    { name: 'Subaru', symbol: 'FUJHY' },
    { name: 'Jaguar', symbol: 'TTM' }, // Jaguar is a brand under Tata Motors
    { name: 'Polestar', symbol: 'PSNY' },
    { name: 'Mini', symbol: 'BMWYY' }, // Mini is a brand under BMW
    { name: 'Lucid', symbol: 'LCID' },
    { name: 'Land Rover', symbol: 'TTM' }, // Land Rover is a brand under Tata Motors
    { name: 'Cadillac', symbol: 'GM' }, // Cadillac is a brand under General Motors
    { name: 'Alfa Romeo', symbol: 'STLA' }, // Alfa Romeo is a brand under Stellantis
    { name: 'Fisker', symbol: 'FSR' },
    { name: 'Mazda', symbol: 'MZDAY' },
    { name: 'Lincoln', symbol: 'F' }, // Lincoln is a luxury division of Ford
    { name: 'Genesis', symbol: 'HYMTF' }, // Genesis is a luxury division of Hyundai
    { name: 'TH!NK', symbol: 'N/A' }, // TH!NK is a defunct brand; no active stock symbol
    { name: 'GMC', symbol: 'GM' }, // GMC is a brand under General Motors
    { name: 'Bentley', symbol: 'VWAGY' }, // Bentley is a subsidiary of Volkswagen
    { name: 'Azure Dynamics', symbol: 'N/A' }, // Azure Dynamics is defunct; no active stock symbol
];

const apiKey = 'VO9JCJZTET7FAY3O';

async function fetchStockPrice(company) {
    if (company.symbol === 'N/A') {
        console.log(`No active stock symbol for ${company.name}.`);
        return;
    }

    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${company.symbol}&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data['Global Quote'] && data['Global Quote']['05. price']) {
            const price = parseFloat(data['Global Quote']['05. price']);
            console.log(`The current stock price of ${company.name} (${company.symbol}) is: $${price}`);
        } else {
            console.log(`Could not fetch price for ${company.name} (${company.symbol}).`);
        }
    } catch (error) {
        console.error(`Error fetching data for ${company.name} (${company.symbol}):`, error);
    }
}
