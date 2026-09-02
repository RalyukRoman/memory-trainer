import { ThemeProvider }  from 'expo-router';
import { useColorScheme } from 'react-native';
import { Slot }           from 'expo-router';

import { AppLightTheme, AppDarkTheme } from '../constants/colors';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={
      colorScheme === 'dark'
        ? AppDarkTheme
        : AppLightTheme
    }>
      <Slot />
    </ThemeProvider>
  );
}
