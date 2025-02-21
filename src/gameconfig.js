// gameConfig.js
export const gameConfig = {
  width: 20, // Grid width
  height: 20, // Grid height
  tickRate: 10, // Updates per second
  continuousSpace: false,
  scoreConfig: {
    foodMultiplier: 10,
    movementMultiplier: 1,
    useSnakeLength: true,
    onScoreUpdate: (score) => {
      console.log("Score updated:", score);
    },
  },
};
