import React, { useCallback, useState } from 'react';
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
  const [username, setUsername] = useState<string>('');
  const [userScores, setUserScores] = useState<Array<{ username: string; score: number }>>([]);
  const scores = [
    { playerName: 'John', score: 5 },
    { playerName: 'Jane', score: 8 },
  ]; // Mock data for scores
  // Function to start the game
  const handleStartGame = (name: string) => {
    const selectedWords = selectRandomWords(wordData.wordList, 10);
    setGameWords(selectedWords);
    setShowGame(true);
    setShowScoreboard(false);
    setUsername(name); // Set the username when starting the game
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

  // Handler for finishing the game
  const handleFinishGame = useCallback((score: number) => {
    setUserScores(prevScores => [...prevScores, { username, score }]);
    setShowGame(false);
    setShowScoreboard(true);
  }, [username]);

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