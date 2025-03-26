import React from 'react';
import { saveAs } from 'file-saver';
import { generateCSV, generatePDF } from '../../utils/exportUtils'; 

const ExportButtons: React.FC = () => {
  const exportCSV = () => {
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    const csv = generateCSV(history);
    const blob = new Blob([csv], { type: 'text/csv' });
    saveAs(blob, 'historico.csv');
  };

  const exportPDF = () => {
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    const pdf = generatePDF(history);
    saveAs(pdf, 'historico.pdf');
  };

  return (
    <div>
      <button onClick={exportCSV} className="button" style={{ marginRight: '1rem', marginTop: '2rem' }}>
        Exportar para CSV
      </button>
      <button onClick={exportPDF} className="button">
        Exportar para PDF
      </button>
    </div>
  );
};

export default ExportButtons;
