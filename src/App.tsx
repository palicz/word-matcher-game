import React, { useCallback, useEffect, useState } from 'react';
import MainMenu from './components/MainMenu';
import Game from './components/Game';
import Scoreboard from './components/Scoreboard';
import wordData from './words.json';

type WordPair = {
  hungarian: string;
  english: string;
};

const App: React.FC = () => {
  const [showGame, setShowGame] = useState(false);
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [gameWords, setGameWords] = useState<WordPair[]>([]);
  const [username, setUsername] = useState<string>('');
  const [scores, setScores] = useState<Array<{ playerName: string; score: number }>>([]);

  // Fetch scores from localStorage when the app starts
  useEffect(() => {
    const savedScores = localStorage.getItem('scores');
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }
  }, []);

  // Function to start the game
  const handleStartGame = (name: string) => {
    const selectedWords = selectRandomWords(wordData.wordList, 10);
    setGameWords(selectedWords);
    setShowGame(true);
    setShowScoreboard(false);
    setUsername(name);
  };

  // Function to select random words from word list
  const selectRandomWords = (wordsArray: WordPair[], n: number): WordPair[] => {
    const shuffled = [...wordsArray].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(n, shuffled.length));
  };

  const handleShowScoreboard = () => {
    setShowScoreboard(true);
    setShowGame(false);
  };

  const handleCloseScoreboard = () => {
    setShowScoreboard(false);
  };

  // Function to handle finishing the game and saving the score
  const handleFinishGame = useCallback((score: number) => {
    const newScore = { playerName: username, score };
    const updatedScores = [...scores, newScore];

    // Save updated scores in localStorage
    localStorage.setItem('scores', JSON.stringify(updatedScores));

    setScores(updatedScores); // Update the state with new scores
    setShowGame(false);
    setShowScoreboard(true);
  }, [username, scores]);

  return (
    <div>
      {/* Render the MainMenu component if showGame is false */}
      {!showGame && !showScoreboard && (
        <MainMenu
          onStartGame={handleStartGame}
          onShowScoreboard={handleShowScoreboard}
        />
      )}
      {/* Render the Game component if showGame is true */}
      {showGame && <Game words={gameWords} onFinish={handleFinishGame} playerName={username} />}
      {/* Render the Scoreboard component if showScoreboard is true */}
      {showScoreboard && <Scoreboard scores={scores} onClose={handleCloseScoreboard} />}
    </div>
  );
};

export default App;