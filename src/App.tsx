import React, { useState } from 'react';
import MainMenu from './components/MainMenu';
import Game from './components/Game';

const App: React.FC = () => {
  const [showGame, setShowGame] = useState(false);

  const handleStartGame = () => {
    setShowGame(true);
  };

  return (
    <div>
      {!showGame && <MainMenu onStartGame={handleStartGame} />}
      {showGame && <Game />}
    </div>
  );
};

export default App;