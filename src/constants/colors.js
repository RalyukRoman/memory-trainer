const DEFAULT_LIGHT_COLORS = {
  primary:      '#007AFF',
  card:         '#FFFFFF',
  border:       '#CCCCCC',
  notification: '#FF3B30',
};

const DEFAULT_DARK_COLORS = {
  primary:      '#0A84FF',
  card:         '#121212',
  border:       '#272729',
  notification: '#FF453A',
};

export const COLORS = {
  LIGHT: {
    ...DEFAULT_LIGHT_COLORS,
    text:               '#000000',
    background:         '#FFFFFF',
    backgroundElement:  '#F0F0F0',
    backgroundSelected: '#E0E1E6',
    textSecondary:      '#60646C',
  },
  DARK: {
    ...DEFAULT_DARK_COLORS,
    text:               '#FFFFFF',
    background:         '#000000',
    backgroundElement:  '#212225',
    backgroundSelected: '#2E3135',
    textSecondary:      '#B0B4BA',
  },
};