import React from 'react';
import './Game.css';

// Define types for better code readability and type safety
interface WordPair {
  hungarian: string;
  english: string;
}

interface GameProps {
  words: WordPair[];
}

// Main Game component
const Game: React.FC<GameProps> = ({words}) => {

  return (
    <div className="game-container">
      <div className="columns">
        <div className="column">
          {words.map(word => (
            <div key={word.hungarian} className="word">
              {word.hungarian}
            </div>
          ))}
        </div>
        <div className="column">
          {words.map(word => (
            <div key={word.english} className="word">
              {word.english}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;