import AsyncStorage from '@react-native-async-storage/async-storage';

import { getHighScoreKey } from '../constants/storage-keys';
import { DIFFICULTIES }    from '../constants/game-values';

export const scoreService = {
  async loadHighScore(
    difficulty
  ){
    try {
      const rawScore = await AsyncStorage.getItem(
        getHighScoreKey(difficulty)
      );

      return rawScore !== null
        ? parseInt(rawScore, 10)
        : 0;
    }
    catch (err) {
      console.error('Error loading high score:', err);
      return 0;
    }
  },

  async saveHighScore(
    difficulty,
    newScore,
    currentHighScore
  ){
    try {
      if (newScore > currentHighScore) {
        await AsyncStorage.setItem(
          getHighScoreKey(difficulty),
          newScore.toString()
        );
        return newScore;
      }
      return currentHighScore;
    }
    catch (err) {
      console.error('Error saving high score:', err);
      return currentHighScore;
    }
  },

  async loadAllHighScores() {
    try {
      return await Promise.all(
        Object.entries(DIFFICULTIES).map(
          async ([difficulty, label]) => {
            const score = await this.loadHighScore(difficulty);
            return { difficulty, label, score };
          }
        )
      );
    }
    catch (err) {
      console.error('Error loading all scores:', err);
      return [];
    }
  },

  async resetAllScores() {
    try {
      for (const key of Object.keys(DIFFICULTIES)) {
        await AsyncStorage.removeItem(
          getHighScoreKey(key)
        );
      }
    }
    catch (err) {
      console.error('Error resetting scores:', err);
    }
  },
};