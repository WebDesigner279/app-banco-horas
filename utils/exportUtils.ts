// utils/exportUtils.ts

export const generateCSV = (history: any[]) => {
    const headers = ['Data', 'Início', 'Fim', 'Total'];
    const rows = history.map(entry => [
      new Date(entry.start).toLocaleDateString(),
      new Date(entry.start).toLocaleTimeString(),
      new Date(entry.end).toLocaleTimeString(),
      entry.total,
    ]);
  
    const csv = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');
  
    return csv;
  };
  
  export const generatePDF = (history: any[]) => {
    const { jsPDF } = require('jspdf');
    const doc = new jsPDF();
  
    doc.text('Histórico de Horas Trabalhadas', 10, 10);
    let y = 20;
    history.forEach(entry => {
      doc.text(`${new Date(entry.start).toLocaleDateString()} - ${entry.total}`, 10, y);
      y += 10;
    });
  
    return doc.output('blob');
  };
  