import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { COLORS } from './colors';

export const AppLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...COLORS.LIGHT,
  },
};

export const AppDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...COLORS.DARK,
  },
};