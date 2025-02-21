// customRenderConfig.js
import humanImage from "../assets/running-svgrepo-com.svg";
import chocolateImage from "../assets/chocolate-bar-svgrepo-com.svg";

export const CELL_SIZE = 20;

// Render a human element for each snake segment
const snakeRenderer = (position) => {
    const element = document.createElement("div");
    element.style.width = `${CELL_SIZE}px`;
    element.style.height = `${CELL_SIZE}px`;
    // Add a fallback background color (red) for the human
    element.style.backgroundColor = "red";
    // Optionally, overlay the human image if loaded
    element.style.backgroundImage = `url(${humanImage})`;
    element.style.backgroundSize = "cover";
    element.style.position = "absolute";
    element.style.left = `${position.x * CELL_SIZE}px`;
    element.style.top = `${position.y * CELL_SIZE}px`;
    return element;
  };
  
  // Render a chocolate element for the food
  const foodRenderer = (position) => {
    const element = document.createElement("div");
    element.style.width = `${CELL_SIZE}px`;
    element.style.height = `${CELL_SIZE}px`;
    // Add a fallback background color (chocolate) for the food
    element.style.backgroundColor = "chocolate";
    // Optionally, overlay the chocolate image if loaded
    element.style.backgroundImage = `url(${chocolateImage})`;
    element.style.backgroundSize = "cover";
    element.style.position = "absolute";
    element.style.left = `${position.x * CELL_SIZE}px`;
    element.style.top = `${position.y * CELL_SIZE}px`;
    return element;
  };
  
  // Clear the board before each render cycle
  const clearRenderer = (boardElement) => {
    boardElement.innerHTML = "";
  };
  
  export const renderConfig = {
    cellSize: CELL_SIZE,
    snakeRenderer,
    foodRenderer,
    clearRenderer,
  };