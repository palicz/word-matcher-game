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
    // Regular expression to allow only letters and numbers
    const validName = /^[a-zA-Z0-9]+$/;

    if (playerName.trim() === '') {
      alert("Please enter your name.");
    } else if (!validName.test(playerName)) {
      alert("Name can only contain letters and numbers.");
    } else if (playerName.length > 15) {
      alert("Name cannot be longer than 15 characters.");
    } else {
      onStartGame(playerName);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  return (
    <div className="main-menu">
      <div className="menu-title">
        Word Matcher Game
      </div>
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
