import React from 'react';
import './Scoreboard.css';

interface Score {
    playerName: string;
    score: number;
    timeElapsed: number;
}
interface ScoreboardProps {
    scores: Score[];
    onClose: () => void;
}const Scoreboard: React.FC<ScoreboardProps> = ({ scores, onClose }) => {
    return (
        <div className="score-container">
            <table className="score-table">
                <thead>
                <tr>
                    <th colSpan={4}>
                        <h1 className="scoreboard-title">Scoreboard</h1>
                    </th>
                </tr>
                <tr>
                    <th>Rank</th>
                    <th>Player Name</th>
                    <th>Score</th>
                    <th>Time (s)</th>  {/* Add a Time column */}
                </tr>
                </thead>
                <tbody>
                {scores
                    .sort((a, b) => b.score - a.score || a.timeElapsed - b.timeElapsed)  // Sort by score, then by time
                    .map((score, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{score.playerName}</td>
                            <td>{score.score}</td>
                            <td>{score.timeElapsed}</td>  {/* Display the time */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={onClose} className="close-button">Close</button>
        </div>
    );}
    export default Scoreboard;