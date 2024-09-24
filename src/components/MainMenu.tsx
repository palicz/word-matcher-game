import React, { useState } from 'react';
import './MainMenu.css';


interface MainMenuProps {
  onStartGame: (playerName: string) => void;
  onShowScoreboard: () => void;
}

// MainMenu component
const MainMenu: React.FC<MainMenuProps> = ({ onStartGame, onShowScoreboard }) => {
  const [playerName, setPlayerName] = useState('');

  const handleStartGame = () => {
    if (playerName.trim() !== '') {
      onStartGame(playerName);
    } else {
      alert("Please enter your name.");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  return (
    <div className="main-menu">
      <input
        type="text"
        placeholder="Enter your name"
        value={playerName}
        onChange={handleInputChange}
        className="player-input"
      />
      
      <button 
        onClick={handleStartGame} 
        className="button"
      >
        Start Game
      </button>
      <button 
        onClick={onShowScoreboard}
        className="button button-secondary"
        style={{ marginTop: '10px' }}
      >
        Scoreboard
      </button>
    </div>
  );
};

export default MainMenu;
