import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Game.css';

// Define types for better code readability and type safety
interface WordPair {
  hungarian: string;
  english: string;
}

interface GameProps {
  words: WordPair[];
  onFinish: (score: number, finishTime: number) => void;  // Include finishTime in the callback
  playerName: string;
}


// Main Game component
const Game: React.FC<GameProps> = ({ words, onFinish, playerName }) => {
  const [shuffledHungarianWords, setShuffledHungarianWords] = useState<WordPair[]>([]);
  const [shuffledEnglishWords, setShuffledEnglishWords] = useState<WordPair[]>([]);
  const [selectedHungarian, setSelectedHungarian] = useState<string | null>(null);
  const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [incorrectPair, setIncorrectPair] = useState<{ hungarian: string, english: string } | null>(null);
  const [currentMatchedPair, setCurrentMatchedPair] = useState<{ hungarian: string, english: string } | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<number | null>(null);
  const [finishTime, setFinishTime] = useState<number | null>(null);


  // Shuffle words when the component mounts
  useEffect(() => {
    setShuffledHungarianWords([...words].sort(() => Math.random() - 0.5));
    setShuffledEnglishWords([...words].sort(() => Math.random() - 0.5));
  }, [words]);

  useEffect(() => {
    if (matchedPairs.size === words.length) {
      if (timerRef.current) {
        clearInterval(timerRef.current);  // Stop the timer
      }
      setIsTimerRunning(false);
      setFinishTime(timeElapsed);  // Store the final completion time
      onFinish(score, timeElapsed);  // Pass score and time to the onFinish callback
    }
  }, [matchedPairs, words.length, score, onFinish, timeElapsed]);



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

  const checkMatch = useCallback((hungarian: string, english: string) => {
    const isMatch = words.some(word => word.hungarian === hungarian && word.english === english);

    if (isMatch) {
      setCurrentMatchedPair({ hungarian, english });

      // Start the timer on the first match
      if (!isTimerRunning) {
        setIsTimerRunning(true);
        timerRef.current = window.setInterval(() => {
          setTimeElapsed(prev => prev + 1);  // Increment time every second
        }, 1000);
      }

      // Immediately hide the words by updating matchedPairs state
      setMatchedPairs(prev => new Set(prev).add(hungarian));

      // Delay only the visual indicator (green color) and then remove it
      setTimeout(() => {
        setCurrentMatchedPair(null);
      }, 1000);

      setScore(prev => prev + 1);
    } else {
      setIncorrectPair({ hungarian, english });
      setTimeout(() => setIncorrectPair(null), 1000);
      setScore(prev => Math.max(0, prev - 1));
    }
  }, [words, isTimerRunning]);


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
            style={{ visibility: isMatched(word.hungarian) ? 'hidden' : 'visible' }}
        >
          {wordText}
        </div>
    );
  }, [selectedHungarian, selectedEnglish, incorrectPair, handleWordSelection, isMatched, isCurrentMatched]);

  // Render the game
  return (
      <div className="game-container">
        <div className="score-container">
          <div className="player-score">
            {playerName}'s score: {score}
          </div>
          <div className="timer">
            Time: {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
          </div>
        </div>
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