export const gameCalculator = {
  calculateDigitCount(
    currentLevel,
    gameConfig
  ){
    const extraDigits = Math.floor(
      (currentLevel - 1)
        / gameConfig.levelsPerExtraDigit
    );

    return Math.min(
      gameConfig.initialDigitCount + extraDigits,
      gameConfig.maxDigitCount
    );
  },

  calculateDuration(
    currentLevel,
    gameConfig
  ){
    const durationReduction = Math.floor(
      (currentLevel - 1)
        / gameConfig.levelsPerExtraDigit
    ) * 0.25;

    return Math.max(
      gameConfig.initialDuration - durationReduction,
      gameConfig.minDuration
    );
  },

  generateSequence(
    currentLevel,
    gameConfig
  ){
    const digitCount = this.calculateDigitCount(
      currentLevel,
      gameConfig
    );

    const result = [];

    for (let i = 0; i < digitCount; i++) {
      const randDigit = Math.floor(Math.random() * 10);
      result.push(randDigit);
    }

    return result;
  },
};