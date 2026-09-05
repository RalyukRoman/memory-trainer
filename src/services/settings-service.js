import AsyncStorage from '@react-native-async-storage/async-storage';

import { STORAGE_KEYS }                         from '../constants/storage-keys';
import { DEFAULT_SETTINGS, DIFFICULTY_PRESETS } from '../constants/game-values';

export const settingsService = {
  async loadSettings() {
    try {
      const savedTheme  = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS.THEME);
      const savedDiff   = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS.DIFFICULTY);
      const savedConfig = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS.CUSTOM_CONFIG);

      const theme      = savedTheme || DEFAULT_SETTINGS.theme;
      const difficulty = savedDiff  || DEFAULT_SETTINGS.difficulty;

      let config = DEFAULT_SETTINGS.config;

      if (difficulty === 'CUSTOM' && savedConfig) {
        config = JSON.parse(savedConfig);
      } else if (DIFFICULTY_PRESETS[difficulty]) {
        config = DIFFICULTY_PRESETS[difficulty];
      }

      return { theme, difficulty, config };
    }
    catch (err) {
      console.error('Error loading settings:', err);

      return {
        theme: DEFAULT_SETTINGS.theme,
        difficulty: DEFAULT_SETTINGS.difficulty,
        config: DEFAULT_SETTINGS.config,
      };
    }
  },

  async saveTheme(theme) {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.SETTINGS.THEME,
        theme
      );
    }
    catch (err) {
      console.error('Error saving theme:', err);
    }
  },

  async saveDifficulty(difficulty) {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.SETTINGS.DIFFICULTY,
        difficulty
      );
    }
    catch (err) {
      console.error('Error saving difficulty:', err);
    }
  },

  async saveCustomConfig(config) {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.SETTINGS.CUSTOM_CONFIG,
        JSON.stringify(config)
      );
    }
    catch (err) {
      console.error('Error saving custom config:', err);
    }
  },
};