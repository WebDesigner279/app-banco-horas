import React, { useState, useEffect } from 'react';

const History: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('history') || '[]');
    setHistory(savedHistory);
  }, []);

  const deleteEntry = (index: number) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    localStorage.setItem('history', JSON.stringify(updatedHistory));
  };

  return (
    <div>
      {/* <h2>Histórico de Horas Trabalhadas</h2> */}
      {history.length === 0 ? (
        <p>Nenhum histórico encontrado.</p>
      ) : (
        <table className="historyTable">
          <thead>
            <tr>
              <th>Data</th>
              <th>Início</th>
              <th>Fim</th>
              <th>Total</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => (
              <tr key={index}>
                <td>{new Date(entry.start).toLocaleDateString()}</td>
                <td>{new Date(entry.start).toLocaleTimeString()}</td>
                <td>{new Date(entry.end).toLocaleTimeString()}</td>
                <td>{entry.total}</td>
                <td>
                  <button 
                    onClick={() => deleteEntry(index)} 
                    className="delete-button"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;
