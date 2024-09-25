import React from 'react';
import './Scoreboard.css';

interface Score {
    playerName: string;
    score: number;
}
interface ScoreboardProps {
    scores: Score[];
    onClose: () => void;
}

const Scoreboard: React.FC<ScoreboardProps> = ({scores,onClose}) => {
  return (
    <div className="score-container">
      <h1>Scoreboard</h1>
        <ul>
            {scores.map((score, index) => (
                <li key={index}>
                    {index + 1}. {score.playerName}: {score.score}
                </li>
            ))}
        </ul>
    <button onClick={onClose}>Close</button>
    </div>
  )
};

export default Scoreboard;