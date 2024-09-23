import React from 'react';

// Define the props interface for MainMenu component
interface MainMenuProps {
  onStartGame: () => void;
}

// MainMenu component
const MainMenu: React.FC<MainMenuProps> = ({ onStartGame }) => {
  return (
    // Main container for the menu
    <div className="main-menu" style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      {/* Button to start the game */}
      <button onClick={onStartGame}>Start Game</button>
    </div>
  );
};

export default MainMenu;