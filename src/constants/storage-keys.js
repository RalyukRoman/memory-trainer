export const STORAGE_KEYS = {
  GAMEPLAY: {
    HIGH_SCORE: 'high_score',
    CURRENT_LEVEL: 'current_level',
  },
  SETTINGS: {
    THEME: 'theme',
    DIFFICULTY: 'difficulty',
    CUSTOM_CONFIG: 'custom_config',
  },
};

export const getHighScoreKey = (
  difficulty
) => (
  `${STORAGE_KEYS.GAMEPLAY.HIGH_SCORE}${difficulty}`
);
