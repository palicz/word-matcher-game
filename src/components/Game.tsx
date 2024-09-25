import React, { useState, useEffect, useCallback } from 'react';
import './Game.css';

// Define types for better code readability and type safety
interface WordPair {
  hungarian: string;
  english: string;
}

interface GameProps {
  words: WordPair[];
  onFinish: (score: number) => void;
  playerName: string;
}

// Main Game component
const Game: React.FC<GameProps> = ({words, onFinish, playerName}) => {
    // State management using hooks
    const [shuffledHungarianWords, setShuffledHungarianWords] = useState<WordPair[]>([]);
    const [shuffledEnglishWords, setShuffledEnglishWords] = useState<WordPair[]>([]);
    const [selectedHungarian, setSelectedHungarian] = useState<string | null>(null);
    const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
    const [incorrectPair, setIncorrectPair] = useState<{ hungarian: string, english: string } | null>(null);
    const [currentMatchedPair, setCurrentMatchedPair] = useState<{ hungarian: string, english: string } | null>(null);

    // Shuffle words when the component mounts
    useEffect(() => {
        setShuffledHungarianWords([...words].sort(() => Math.random() - 0.5));
        setShuffledEnglishWords([...words].sort(() => Math.random() - 0.5));
    }, [words]);

      // Check if the game is finished
  useEffect(() => {
    if (matchedPairs.size === words.length) {
      onFinish(score);
    }
  }, [matchedPairs, words.length, score, onFinish]);

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

  // Check if the selected words match
  const checkMatch = useCallback((hungarian: string, english: string) => {
    const isMatch = words.some(word => word.hungarian === hungarian && word.english === english);
    if (isMatch) {
      setCurrentMatchedPair({ hungarian, english });
      setTimeout(() => {
        setMatchedPairs(prev => new Set(prev).add(hungarian));
        setCurrentMatchedPair(null);
      }, 1000);
      setScore(prev => prev + 1);
    } else {
      setIncorrectPair({ hungarian, english });
      setTimeout(() => setIncorrectPair(null), 1000);
      setScore(prev => Math.max(0, prev - 1));
    }
  }, [words]);

    // Helper functions for rendering
    const isMatched = useCallback((hungarian: string) => matchedPairs.has(hungarian), [matchedPairs]);
    const isCurrentMatched = useCallback((hungarian: string, english: string) => 
      currentMatchedPair?.hungarian === hungarian && currentMatchedPair?.english === english, 
    [currentMatchedPair]);

  // Render word element
  const renderWord = useCallback((word: WordPair, language: 'hungarian' | 'english') => {
    const isSelected = language === 'hungarian' ? selectedHungarian === word.hungarian : selectedEnglish === word.english;
    const isIncorrect = language === 'hungarian' ? incorrectPair?.hungarian === word.hungarian : incorrectPair?.english === word.english;
    const wordText = language === 'hungarian' ? word.hungarian : word.english;

    return (
      <div
        key={wordText}
        className={`word ${isSelected ? 'selected' : ''} ${isCurrentMatched(word.hungarian, word.english) ? 'matched' : ''} ${isIncorrect ? 'incorrect' : ''}`}
        onClick={() => handleWordSelection(language, wordText)}
        style={{ display: isMatched(word.hungarian) ? 'none' : 'block' }}
      >
        {wordText}
      </div>
    );
  }, [selectedHungarian, selectedEnglish, incorrectPair, handleWordSelection, isMatched, isCurrentMatched]);

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
            <div className="score-container">
              <div className="player-score">
                      {playerName}'s score: {score}
              </div>
            </div>
        </div>
    );
};

export default Game;