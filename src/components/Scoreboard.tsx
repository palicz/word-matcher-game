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
    <div className="scoreboard-container">

        <table className="score-table">
            <thead>
            <tr>
                <th colSpan={3}> <h1 className="scoreboard-title">Scoreboard</h1></th>
            </tr>
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
    <div className="close-button-container">
        <button onClick={onClose} className="close-button">Close</button>
    </div>           
    </div>
  )
};

export default Scoreboard;