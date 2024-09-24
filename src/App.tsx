import React, { useState } from 'react';
import MainMenu from './components/MainMenu';
import Game from './components/Game';
import wordData from './words.json';
import Scoreboard from './components/Scoreboard';

type WordPair = {
  hungarian: string;
  english: string;
};

const App: React.FC = () => {
  const [showGame, setShowGame] = useState(false); // State to toggle the Game component
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [gameWords, setGameWords] = useState<WordPair[]>([]);

  // Function to start the game
  const handleStartGame = (name: string) => {
    const selectedWords = selectRandomWords(wordData.wordList, 10);
    setGameWords(selectedWords);
    setShowGame(true);
    setShowScoreboard(false);
  };

  // Function to randomly select n words from the array
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
      {showGame && <Game words={gameWords} />}
      {/* Render the Scoreboard component if showScoreboard is true */}
      {showScoreboard && <Scoreboard onClose={handleCloseScoreboard} />}
    </div>
  );
};

export default App;