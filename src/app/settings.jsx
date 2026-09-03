import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView }                         from 'react-native';

import AsyncStorage        from '@react-native-async-storage/async-storage';
import { useThemeContext } from './_layout';

import ThemedText from '../components/ui/themed-text';
import ThemedView from '../components/ui/themed-view';

import SettingsSelector from '../components/setting-page/settings-selector';
import GameConfigs      from '../components/setting-page/game-configs';

import { THEMES }       from '../constants/theme';
import { STORAGE_KEYS } from '../constants/storage-keys';
import { SPACING }      from '../constants/tokens';

import {
  DIFFICULTY_PRESETS,
  DEFAULT_SETTINGS,
  DIFFICULTIES,
} from '../constants/game-values';

export default function SettingsPage() {
  const { loadTheme: loadThemeInApp } = useThemeContext();

  const [selectedTheme, setSelectedTheme] = useState(DEFAULT_SETTINGS.theme);
  const [difficulty,    setDifficulty]    = useState(DEFAULT_SETTINGS.difficulty);
  const [config,        setConfig]        = useState(DEFAULT_SETTINGS.config);

  useEffect(() => {
    loadSettings().then();
  }, []);

  const loadSettings = async () => {
    try {
      const savedTheme  = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS.THEME);
      const savedDiff   = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS.DIFFICULTY);
      const savedConfig = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS.CUSTOM_CONFIG);

      const activeTheme = savedTheme || DEFAULT_SETTINGS.theme;
      setSelectedTheme(activeTheme);

      const activeDiff = savedDiff || DEFAULT_SETTINGS.difficulty;
      setDifficulty(activeDiff);

      if (activeDiff === 'CUSTOM' && savedConfig) {
        setConfig(JSON.parse(savedConfig));
      } else if (DIFFICULTY_PRESETS[activeDiff]) {
        setConfig(DIFFICULTY_PRESETS[activeDiff]);
      } else {
        setConfig(DEFAULT_SETTINGS.config);
      }
    }
    catch (err) {
      console.error('Error loading settings:', err);
    }
  };

  const handleThemeChange = async (newTheme) => {
    loadThemeInApp(newTheme);
    setSelectedTheme(newTheme);

    await AsyncStorage.setItem(
      STORAGE_KEYS.SETTINGS.THEME,
      newTheme
    );
  };

  const handleDifficultyChange = async (newDiff) => {
    setDifficulty(newDiff);

    await AsyncStorage.setItem(
      STORAGE_KEYS.SETTINGS.DIFFICULTY,
      newDiff
    );

    if (newDiff !== 'CUSTOM') {
      const newConfig = DIFFICULTY_PRESETS[newDiff];
      setConfig(newConfig);

      await AsyncStorage.setItem(
        STORAGE_KEYS.SETTINGS.CUSTOM_CONFIG,
        JSON.stringify(newConfig)
      );
    }
  };

  const handleConfigChange = async (key, value) => {
    if (difficulty === 'CUSTOM') {
      const numValue = parseFloat(value) || 0;
      const updated = { ...config, [key]: numValue };
      setConfig(updated);

      await AsyncStorage.setItem(
        STORAGE_KEYS.SETTINGS.CUSTOM_CONFIG,
        JSON.stringify(updated)
      );
    }
  };

  const isCustom = difficulty === 'CUSTOM';

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText
          variant="captionBold"
          colorVariant="secondary"
          style={styles.sectionHeader}
        >
          GENERAL
        </ThemedText>

        <SettingsSelector
          title="Theme"
          options={THEMES}
          selectedValue={selectedTheme}
          onSelect={handleThemeChange}
        />

        <ThemedText
          variant="captionBold"
          colorVariant="secondary"
          style={styles.sectionHeader}
        >
          GAME CONFIGS
        </ThemedText>

        <SettingsSelector
          title="Difficulty"
          options={DIFFICULTIES}
          selectedValue={difficulty}
          onSelect={handleDifficultyChange}
        />

        <GameConfigs
          config={config}
          isCustom={isCustom}
          onChangeConfig={handleConfigChange}
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.four,
    gap: SPACING.three,
  },
  sectionHeader: {
    marginTop: SPACING.two,
    marginBottom: -SPACING.one,
  },
});