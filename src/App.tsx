import React, { useState } from 'react';
import MainMenu from './components/MainMenu';
import Game from './components/Game';
import wordData from './words.json';

type WordPair = {
  hungarian: string;
  english: string;
};

// Load word list from JSON file
const wordList: WordPair[] = wordData.wordList.slice(0, 10);

const App: React.FC = () => {
  const [showGame, setShowGame] = useState(false); // State to toggle the Game component

  // Function to start the game
  const handleStartGame = () => {
    setShowGame(true); // Set the state to true to show the Game component
  };

  return (
    <div>
      {/* Render the MainMenu component if showGame is false */}
      {!showGame && <MainMenu onStartGame={handleStartGame} />}
      {/* Render the Game component if showGame is true */}
      {showGame && <Game words={wordList} />}
    </div>
  );
};

export default App;