import React, { useState, useEffect } from 'react';

const TimeCard: React.FC = () => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [totalTime, setTotalTime] = useState<string>('');
  const [message, setMessage] = useState<string>('Clique em Iniciar para iniciar a sua jornada!'); // Mensagem inicial
  const [isRunning, setIsRunning] = useState<boolean>(false); // Indica se a jornada está em andamento
  const [historyExists, setHistoryExists] = useState<boolean>(false); // Verifica se há histórico salvo

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    setHistoryExists(history.length > 0);
  }, []);

  const startTimer = () => {
    setStartTime(new Date());
    setEndTime(null);
    setIsRunning(true);
    setMessage('Jornada Iniciada!');
    alert('Jornada Iniciada!');
  };

  const endTimer = () => {
    if (!isRunning) {
      setMessage('Clique em Iniciar para iniciar a sua jornada!');
      alert('Clique em Iniciar para iniciar a sua jornada!');
      return;
    }

    if (startTime) {
      const now = new Date();
      setEndTime(now);
      setIsRunning(false);
      const duration = (now.getTime() - startTime.getTime()) / 1000 / 60;
      const hours = Math.floor(duration / 60);
      const minutes = Math.round(duration % 60);
      setTotalTime(`${hours}h ${minutes}m`);
      saveToLocalStorage(startTime, now, `${hours}h ${minutes}m`);
      setMessage(`Jornada Finalizada! Total: ${hours}h ${minutes}m`);
      alert(`Jornada Finalizada! Total: ${hours}h ${minutes}m`);

      setTimeout(() => {
        const history = JSON.parse(localStorage.getItem('history') || '[]');
        setHistoryExists(history.length > 0);
        setStartTime(null);
        setEndTime(new Date(history[history.length - 1]?.end || ''));
        setTotalTime(history[history.length - 1]?.total || '');
        setMessage('Clique em Iniciar para iniciar a sua jornada!');
      }, 100);
    }
  };

  const saveToLocalStorage = (start: Date, end: Date, total: string) => {
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    history.push({ start, end, total });
    localStorage.setItem('history', JSON.stringify(history));
    setHistoryExists(true);
  };

  const clearHistory = () => {
    if (!historyExists) {
      alert('Você não possui histórico para ser excluído!');
      return;
    }

    localStorage.removeItem('history');
    setStartTime(null);
    setEndTime(null);
    setTotalTime('');
    setHistoryExists(false);
    setMessage('Histórico excluído! Clique em Iniciar para começar uma nova jornada.');
    alert('Histórico de jornada excluído!');
  };

  return (
    <div>
      <button 
        onClick={startTimer} 
        className="button" 
        style={{ marginRight: '1rem', marginBottom: '2rem', marginTop: '4rem' }}
        disabled={isRunning}
      >
        Início
      </button>
      <button 
        onClick={endTimer} 
        className="button" 
        disabled={!isRunning}
        style={{ marginRight: '1rem' }}
      >
        Fim
      </button>
      <button 
        onClick={clearHistory} 
        className="button button-danger"
      >
        Excluir Histórico
      </button>
      
      <div>Total de Horas Trabalhadas: {totalTime}</div>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default TimeCard;
