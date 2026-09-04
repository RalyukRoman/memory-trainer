import { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider }  from 'expo-router';
import { useColorScheme } from 'react-native';
import { Stack }          from 'expo-router';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppLightTheme, AppDarkTheme } from '../constants/theme';
import { STORAGE_KEYS }                from '../constants/storage-keys';

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
    try {
      const savedTheme = await AsyncStorage.getItem(
        STORAGE_KEYS.SETTINGS.THEME
      );

      if (savedTheme) {
        setThemeMode(savedTheme);
      }
    }
    catch (err) {
      console.error('Error loading theme:', err);
    }
  };

  const isDark =
    themeMode === 'dark' ||
    (themeMode === 'system' &&
      colorScheme === 'dark');

  const currentTheme = isDark
    ? AppDarkTheme
    : AppLightTheme

  return (
    <ThemeContext.Provider value={{ loadTheme }}>
      <ThemeProvider value={currentTheme}>
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
              headerStyle: { backgroundColor: currentTheme.colors.background },
              headerTintColor: currentTheme.colors.text,
            }}
          />

          <Stack.Screen
            name="settings"
            options={{
              title: 'Settings',
              headerStyle: { backgroundColor: currentTheme.colors.background },
              headerTintColor: currentTheme.colors.text,
            }}
          />
        </Stack>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => (
  useContext(ThemeContext)
);
