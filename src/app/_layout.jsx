import { ThemeProvider }  from 'expo-router';
import { useColorScheme } from 'react-native';
import { Stack }          from 'expo-router';

import { AppLightTheme, AppDarkTheme } from '../constants/theme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={
      colorScheme === 'dark'
        ? AppDarkTheme
        : AppLightTheme
    }>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
