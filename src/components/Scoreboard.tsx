import React from 'react';
import './Scoreboard.css';

interface ScoreboardProps {
    onClose: () => void;
}

const Scoreboard: React.FC<ScoreboardProps> = ({onClose}) => {
  return (
    <div>
      <h1>Scoreboard</h1>
    <button onClick={onClose}>Close</button>
    </div>
  )
};

export default Scoreboard;