import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

const History: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [totalWorkedTime, setTotalWorkedTime] = useState<string>("0h 00m");

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("history") || "[]");
    setHistory(savedHistory);
    calculateTotalWorkedTime(savedHistory);
  }, []);

  const calculateTotalWorkedTime = (entries: any[]) => {
    let totalMinutes = 0;

    entries.forEach((entry) => {
      const [hours, minutes] = entry.total.split("h ").map((str) => parseInt(str));
      totalMinutes += hours * 60 + minutes;
    });

    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    setTotalWorkedTime(`${totalHours}h ${remainingMinutes}m`);
  };

  const clearHistoryAndRefresh = () => {
    localStorage.removeItem("history");
    localStorage.removeItem("totalTime");
    setHistory([]);
    setTotalWorkedTime("0h 00m");
    alert("Histórico excluído e página recarregada!");
    window.location.reload();
  };

  const deleteEntry = (index: number) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    localStorage.setItem("history", JSON.stringify(updatedHistory));
    calculateTotalWorkedTime(updatedHistory);

    if (updatedHistory.length === 0) {
      clearHistoryAndRefresh();
    }
  };

  return (
    <div>
      {history.length === 0 ? (
        <p>Nenhum histórico encontrado.</p>
      ) : (
        <>
          <div className="table-container">
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
                        style={{ padding: "8px" }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3>Total das Horas Trabalhadas no Período: {totalWorkedTime}</h3>
        </>
      )}
    </div>
  );
};

export default History;
