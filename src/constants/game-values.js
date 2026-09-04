export const GAME_PHASES = {
  IDLE:    'IDLE',
  SHOW:    'SHOW',
  INPUT:   'INPUT',
  RESULT:  'RESULT',
  STOPPED: 'STOPPED',
};

export const DIFFICULTIES = {
  EASY:   'EASY',
  MEDIUM: 'MEDIUM',
  HARD:   'HARD',
  CUSTOM: 'CUSTOM'
};

export const DIFFICULTY_PRESETS = {
  EASY: {
    pointsPerLevel: 1,
    initialDigitCount: 3,
    initialDuration: 5.0,
    levelsPerExtraDigit: 3,
    maxDigitCount: 8,
    minDuration: 2.0,
  },
  MEDIUM: {
    pointsPerLevel: 1,
    initialDigitCount: 4,
    initialDuration: 3.0,
    levelsPerExtraDigit: 2,
    maxDigitCount: 12,
    minDuration: 1.0,
  },
  HARD: {
    pointsPerLevel: 2,
    initialDigitCount: 5,
    initialDuration: 2.0,
    levelsPerExtraDigit: 1,
    maxDigitCount: 15,
    minDuration: 0.5,
  },
};

export const DEFAULT_SETTINGS = {
  difficulty: 'MEDIUM',
  theme: 'system',
  config: DIFFICULTY_PRESETS.MEDIUM,
};