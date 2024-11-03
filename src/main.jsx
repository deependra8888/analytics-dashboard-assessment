import { createRoot } from 'react-dom/client';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.css"; // Mandatory CSS required by the Data Grid
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(<App />);
