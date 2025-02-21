// App.js
import { useEffect, useRef, useState } from "react";
import { Snake } from "snake-game-engine";
import { gameConfig } from "./gameconfig";
import { renderConfig, CELL_SIZE } from "./renderer/customRenderer";
import "./App.css";

function App() {
  const [isGameRunning, setIsGameRunning] = useState(false);
  const gameRef = useRef(null);
  const boardRef = useRef(null);
  const scoreRef = useRef(null); // if you want to display score

  const handleGameOver = () => {
    alert("Game Over!");
    setIsGameRunning(false);
    gameRef.current && gameRef.current.stop();
  };

  const startGame = () => {
    // Ensure previous game is stopped and clear the board
    gameRef.current && gameRef.current.stop();
    if (boardRef.current) {
      renderConfig.clearRenderer(boardRef.current);
      // Create new game instance
      gameRef.current = new Snake(gameConfig, renderConfig, handleGameOver);
      gameRef.current.start();
      setIsGameRunning(true);
    }
  };

  // Setup keyboard event listener for direction changes
  useEffect(() => {
    const handleKeydown = (event) => {
      if (!gameRef.current) return;
      const directions = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      };
      const newDirection = directions[event.key];
      if (newDirection) {
        gameRef.current.setDirection(newDirection);
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <div className="app">
      <div
        ref={boardRef}
        className="game-board"
        style={{
          width: gameConfig.width * CELL_SIZE,
          height: gameConfig.height * CELL_SIZE,
          position: "relative", // Allows absolute positioning inside
          backgroundColor: "#f0f0f0", // Light gray background for debugging
          border: "2px solid #ccc",
        }}
      > </div>
      <div className="score">
        Score: <span ref={scoreRef}>0</span>  
      </div>
      <div className="controls">
        <button onClick={startGame}>
          {isGameRunning ? "Restart Game" : "Start Game"}
        </button>
        {/* Optional: add a difficulty selector if needed */}
      </div>
    </div>
  );
}

export default App;
