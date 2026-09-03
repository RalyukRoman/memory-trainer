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

        <Stack.Screen
          name="stats"
          options={{
            title: 'Statistics',
            headerStyle: {
              backgroundColor: colorScheme === 'dark'
                ? '#000000'
                : '#FFFFFF'
            },
            headerTintColor: colorScheme === 'dark'
              ? '#FFFFFF'
              : '#000000',
          }}
        />

        <Stack.Screen
          name="settings"
          options={{
            title: 'Settings',
            headerStyle: {
              backgroundColor: colorScheme === 'dark'
                ? '#000000'
                : '#FFFFFF'
            },
            headerTintColor: colorScheme === 'dark'
              ? '#FFFFFF'
              : '#000000',
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
