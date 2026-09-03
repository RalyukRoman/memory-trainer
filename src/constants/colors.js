import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const COLORS = {
  LIGHT: {
    ...DefaultTheme.colors,
    text:               '#000000',
    background:         '#FFFFFF',
    backgroundElement:  '#F0F0F0',
    backgroundSelected: '#E0E1E6',
    textSecondary:      '#60646C',
  },
  DARK: {
    ...DarkTheme.colors,
    text:               '#FFFFFF',
    background:         '#000000',
    backgroundElement:  '#212225',
    backgroundSelected: '#2E3135',
    textSecondary:      '#B0B4BA',
  },
};