import React, { useState, useEffect } from 'react';
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
    // State management using hooks
    const [shuffledHungarianWords, setShuffledHungarianWords] = useState<WordPair[]>([]);
    const [shuffledEnglishWords, setShuffledEnglishWords] = useState<WordPair[]>([]);

    // Shuffle words when the component mounts
    useEffect(() => {
        setShuffledHungarianWords([...words].sort(() => Math.random() - 0.5));
        setShuffledEnglishWords([...words].sort(() => Math.random() - 0.5));
    }, [words]);

    // Render the game
    return (
        <div className="game-container">
            <div className="columns">
                <div className="column">
                    {shuffledHungarianWords.map(word => (
                        <div key={word.hungarian} className="word">
                            {word.hungarian}
                        </div>
                    ))}
                </div>
                <div className="column">
                    {shuffledEnglishWords.map(word => (
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