import React, { useState } from 'react';
import MainMenu from './components/MainMenu';
import Game from './components/Game';
import wordData from './words.json';
import Scoreboard from './components/Scoreboard';

type WordPair = {
  hungarian: string;
  english: string;
};

// Load word list from JSON file


const App: React.FC = () => {
  const [showGame, setShowGame] = useState(false); // State to toggle the Game component
  const [showScoreboard, setShowScoreboard] = useState(false);
  const wordList: WordPair[] = wordData.wordList.slice(0, 10);

  // Function to start the game
  const handleStartGame = (name: string) => {
    setShowGame(true); // Set the state to true to show the Game component
    setShowScoreboard(false);
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
        <MainMenu onStartGame={handleStartGame}
          onShowScoreboard={handleShowScoreboard} />)}
      {/* Render the Game component if showGame is true */}
      {showGame && <Game words={wordList}/>}
      {showScoreboard && <Scoreboard onClose={handleCloseScoreboard}/>}
    </div>
  );
};

export default App;