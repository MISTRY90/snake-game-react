import React, { useState, useEffect, useRef } from "react";
import { Snake } from "react-snake-lib";
import "./App.css";

const App = () => {
  // Create audio references for WAV files (ensure these files exist in public/sounds/)
const eatAudioRef = useRef(new Audio("./mixkit-chewing-something-crunchy-2244.wav"));
  const gameOverAudioRef = useRef(new Audio("./mixkit-sad-game-over-trombone-471.wav"));
  const successAudioRef = useRef(new Audio("./mixkit-male-voice-cheer-victory-2011.wav"));


  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showTimeoutAlert, setShowTimeoutAlert] = useState(false);

  // Timer effect: Decreases timeLeft every second when the game is active.
  useEffect(() => {
    let timer;
    if (gameStarted && !gameOver && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Time is up: Stop the game.
            setGameOver(true);
            setGameStarted(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, gameOver, timeLeft]);

  // Watch for timeout condition (time has run out and score is less than 5).
  useEffect(() => {
    if (timeLeft === 0 && score < 10) {
      setShowTimeoutAlert(true);
    }
  }, [timeLeft, score]);

  // Resets game state and starts a new game.
  const onGameStart = () => {
    setGameStarted(true);
    setGameOver(false);
    setTimeLeft(30);
    setScore(0);
    setShowSuccessAlert(false);
    setShowTimeoutAlert(false);
  };

  // Called when the snake hits a wall.
  const onGameOver = () => {
    setGameOver(true);
    setGameStarted(false);
    // Play game over sound
    gameOverAudioRef.current.play();
  };

  // Update score and trigger the success alert if score reaches 5.
  const onScoreChange = (newScore) => {
    setScore(newScore);
    // Play the eating sound for every food eaten until the player wins.
    if (newScore < 5) {
      eatAudioRef.current.play();
    }
    if (newScore >= 5 && !showSuccessAlert) {
      setShowSuccessAlert(true);
      setGameOver(true);
      setGameStarted(false);
      // Play success sound
      successAudioRef.current.play();
    }
  };

  // Refreshes the page.
  const refreshPage = () => {
    window.location.reload();
  };

  // Navigates to the next level using the provided URL.
  const navigateToNextLevel = () => {
    window.location.href = "https://valentine-game-eta.vercel.app/";
  };

  return (
    <div className="app-container">
      <h1>Snake Game</h1>
      <p className="status">
        Time Left: {timeLeft}s | Score: {score}
      </p>
      <p className="instructions">Score 5 in 30 seconds and win</p>

      <Snake
        onScoreChange={onScoreChange}
        onGameOver={onGameOver}
        onGameStart={onGameStart}
        width="1000px"
        height="700px"
        bgColor="silver"
        innerBorderColor="#b1b0b0"
        snakeSpeed={110}
        borderColor="black"
        snakeColor="#3e3e3e"
        snakeHeadColor="#1a1a1a"
        appleColor="tomato"
        borderRadius={5}
        snakeHeadRadius={1}
        borderWidth={0}
        shakeBoard={true}
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        size={16}
        startGameText="Start Game"
        startButtonStyle={{
          color: "white",
          padding: "6px 20px",
          backgroundColor: "#1a1a1a",
          borderRadius: "10px",
          fontSize: "17px",
          fontWeight: "600",
          cursor: "pointer",
        }}
        startButtonHoverStyle={{
          backgroundColor: "#4f4d4d",
        }}
        noWall={true}
      />

      {/* Custom Success Alert */}
      {showSuccessAlert && (
        <div className="custom-alert-overlay">
          <div className="custom-alert">
            <h2>🎉 Successful! 🎉</h2>
            <button type="button" onClick={navigateToNextLevel}>
              Next Level
            </button>
          </div>
        </div>
      )}

      {/* Custom Timeout Alert */}
      {showTimeoutAlert && (
        <div className="custom-alert-overlay">
          <div className="custom-alert">
            <h2>Time's Up!</h2>
            <p>You did not score 5 in 30 seconds.</p>
            <div className="button-group">
              <button type="button" onClick={refreshPage}>
                Start Game
              </button>
              <button type="button" onClick={navigateToNextLevel}>
                Skip Level
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fallback Game Over Message for other scenarios */}
      {gameOver && !showSuccessAlert && !showTimeoutAlert && (
        <h2 className="game-over">Game Over! 🐍</h2>
      )}
    </div>
  );
};

export default App;
