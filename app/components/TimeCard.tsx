import React, { useState, useEffect } from 'react';

const TimeCard: React.FC = () => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [totalTime, setTotalTime] = useState<string>('');
  const [message, setMessage] = useState<string>('Clique em inicializar para iniciar a sua jornada!'); // Mensagem inicial
  const [isRunning, setIsRunning] = useState<boolean>(false); // Indica se a jornada está em andamento
  const [historyExists, setHistoryExists] = useState<boolean>(false); // Verifica se há histórico salvo

  useEffect(() => {
    // Recupera o histórico e o total de horas armazenado
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    const storedTotalTime = localStorage.getItem('totalTime') || '';
    setHistoryExists(history.length > 0);
    setTotalTime(storedTotalTime); // Mantém o total de horas mesmo após recarregar
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
      setMessage('Clique em inicializar para iniciar a sua jornada!');
      alert('Clique em inicializar para iniciar a sua jornada!');
      return;
    }

    if (startTime) {
      const now = new Date();
      setEndTime(now);
      setIsRunning(false);
      const duration = (now.getTime() - startTime.getTime()) / 1000 / 60;
      const hours = Math.floor(duration / 60);
      const minutes = Math.round(duration % 60);
      const total = `${hours}h ${minutes}m`;
      setTotalTime(total);
      saveToLocalStorage(startTime, now, total);
      setMessage(`Jornada Finalizada! Total: ${hours}h ${minutes}m`);
      alert(`Jornada Finalizada! Total: ${hours}h ${minutes}m`);

      setTimeout(() => {
        const history = JSON.parse(localStorage.getItem('history') || '[]');
        setHistoryExists(history.length > 0);
        setStartTime(null);
        setEndTime(new Date(history[history.length - 1]?.end || ''));
        setMessage('Clique em inicializar para iniciar a sua jornada!');
        window.location.reload(); // Atualiza a página para exibir os dados
      }, 100);
    }
  };

  const saveToLocalStorage = (start: Date, end: Date, total: string) => {
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    history.push({ start, end, total });
    localStorage.setItem('history', JSON.stringify(history));
    localStorage.setItem('totalTime', total); // Armazena o total de horas trabalhadas
    setHistoryExists(true);
  };

  const clearHistoryAndRefresh = () => {
    if (!historyExists) {
      alert('Você não possui histórico para ser excluído!');
      return;
    }

    localStorage.removeItem('history');
    localStorage.removeItem('totalTime'); // Remove também o total de horas
    setStartTime(null);
    setEndTime(null);
    setTotalTime('');
    setHistoryExists(false);
    setMessage('Histórico excluído e página recarregada! Clique em Iniciar para começar uma nova jornada.');
    alert('Histórico de jornada excluído e página recarregada!');
    window.location.reload(); // Atualiza a página
  };

  return (
    <div>
      <button 
        onClick={startTimer} 
        className="button" 
        style={{ marginRight: '1.8rem', marginBottom: '2rem', marginTop: '1rem' }}
        disabled={isRunning}
      >
        Inicializar
      </button>
      <button 
        onClick={endTimer} 
        className="button" 
        disabled={!isRunning}
        style={{ marginTop: '-1.5rem' }}
      >
        Finalizar
      </button>
      
      {/* Novo botão para limpar o histórico e recarregar a página */}
      <button 
        onClick={clearHistoryAndRefresh} 
        className="button button-danger"
      >
        Limpar Histórico e Atualizar
      </button>

      <div className='totalHoras'>Total de Horas Trabalhadas: {totalTime}</div>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default TimeCard;
