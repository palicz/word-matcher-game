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
        <table className="score-table">
            <thead>
            <tr>
                <th>Rank</th>
                <th>Player Name</th>
                <th>Score</th>
            </tr>
            </thead>
            <tbody>
            {scores
                .sort((a, b) => b.score - a.score) // Sort scores in descending order
                .map((score, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{score.playerName}</td>
                        <td>{score.score}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    <button onClick={onClose} className="close-button">Close</button>

    </div>
  )
};

export default Scoreboard;