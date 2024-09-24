import React, { useState, useEffect, useCallback } from 'react';
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
    const [selectedHungarian, setSelectedHungarian] = useState<string | null>(null);
    const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);

    // Shuffle words when the component mounts
    useEffect(() => {
        setShuffledHungarianWords([...words].sort(() => Math.random() - 0.5));
        setShuffledEnglishWords([...words].sort(() => Math.random() - 0.5));
    }, [words]);

    const handleWordSelection = useCallback((language: 'hungarian' | 'english', word: string) => {
      const setSelected = language === 'hungarian' ? setSelectedHungarian : setSelectedEnglish;
      const otherSelected = language === 'hungarian' ? selectedEnglish : selectedHungarian;
  
      setSelected((prev) => (prev === word ? null : word));
  
      if (otherSelected) {
        checkMatch(language === 'hungarian' ? word : otherSelected, language === 'english' ? word : otherSelected);
        setSelectedHungarian(null);
        setSelectedEnglish(null);
      }
    }, [selectedHungarian, selectedEnglish]);

    const checkMatch = (hungarian: string | null, english: string | null) => {
      if (hungarian && english) {
          const match = words.find(pair => pair.hungarian === hungarian && pair.english === english);
          if (match) {
              console.log('Match found!');
              // TODO: Implement match handling (e.g., green text fade-out effect, remove words, update score)
          } else {
              console.log('No match');
              // TODO: Implement mismatch handling (e.g., red vibration effect)
          }
        }
    };

    // Render word element
    const renderWord = useCallback((word: WordPair, language: 'hungarian' | 'english') => {
      const isSelected = language === 'hungarian' ? selectedHungarian === word.hungarian : selectedEnglish === word.english;
      const wordText = language === 'hungarian' ? word.hungarian : word.english;

      return (
        <div
          key={wordText}
          className={`word ${isSelected ? 'selected' : ''}`}
          onClick={() => handleWordSelection(language, wordText)}
          style={{ borderColor: isSelected ? 'blue' : 'transparent' }}
        >
          {wordText}
        </div>
      );
    }, [selectedHungarian, selectedEnglish, handleWordSelection]);

    // Render the game
    return (
        <div className="game-container">
            <div className="columns">
                <div className="column">
                    {shuffledHungarianWords.map(word => renderWord(word, 'hungarian'))}
                </div>
                <div className="column">
                    {shuffledEnglishWords.map(word => renderWord(word, 'english'))}
                </div>
            </div>
        </div>
    );
};

export default Game;