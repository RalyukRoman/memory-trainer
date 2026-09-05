import { createContext, useContext, useState, useEffect } from 'react';
import { SafeAreaProvider }                               from "react-native-safe-area-context";

import { ThemeProvider }  from 'expo-router';
import { useColorScheme } from 'react-native';
import { Stack }          from 'expo-router';

import { settingsService }             from '../services/settings-service';
import { AppLightTheme, AppDarkTheme } from '../constants/theme';

const ThemeContext = createContext({
  loadTheme: () => {}
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState('system');

  useEffect(() => {
    loadTheme().then();
  }, []);

  const loadTheme = async () => {
    const { theme } = await settingsService.loadSettings();
    setThemeMode(theme);
  };

  const isDark =
    themeMode === 'dark' ||
    (themeMode === 'system' &&
      colorScheme === 'dark');

  const currentTheme = isDark
    ? AppDarkTheme
    : AppLightTheme

  return (
    <SafeAreaProvider>
      <ThemeContext.Provider value={{ loadTheme }}>
        <ThemeProvider value={currentTheme}>
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: currentTheme.colors.background },
              headerTintColor: currentTheme.colors.text,
            }}
          >
            <Stack.Screen
              name="index"
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="stats"
              options={{ title: 'Statistics' }}
            />

            <Stack.Screen
              name="settings"
              options={{ title: 'Settings' }}
            />
          </Stack>
        </ThemeProvider>
      </ThemeContext.Provider>
    </SafeAreaProvider>
  );
}

export const useThemeContext = () => (
  useContext(ThemeContext)
);
