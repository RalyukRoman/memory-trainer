import { useState, useEffect }    from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView }           from 'react-native-safe-area-context';

import { useThemeContext }                   from './_layout';
import { settingsService }                   from '../services/settings-service';
import { THEMES }                            from '../constants/theme';
import { SPACING }                           from '../constants/tokens';
import { DIFFICULTY_PRESETS, DIFFICULTIES }  from '../constants/game-values';

import ThemedText       from '../components/ui/themed-text';
import ThemedView       from '../components/ui/themed-view';
import SettingsSelector from '../components/setting-page/settings-selector';
import SettingsConfigs  from '../components/setting-page/settings-configs';

export default function SettingsPage() {
  const { loadTheme: loadThemeInApp } = useThemeContext();

  const [selectedTheme, setSelectedTheme] = useState('system');
  const [difficulty,    setDifficulty]    = useState('MEDIUM');
  const [config,        setConfig]        = useState({});

  useEffect(() => {
    loadSettings().then();
  }, []);

  const loadSettings = async () => {
    const settings = await settingsService.loadSettings();

    setSelectedTheme(settings.theme);
    setDifficulty(settings.difficulty);
    setConfig(settings.config);
  };

  const handleThemeChange = async (newTheme) => {
    setSelectedTheme(newTheme);
    await settingsService.saveTheme(newTheme);

    loadThemeInApp();
  };

  const handleDifficultyChange = async (newDiff) => {
    setDifficulty(newDiff);
    await settingsService.saveDifficulty(newDiff);

    if (newDiff !== 'CUSTOM') {
      const newConfig = DIFFICULTY_PRESETS[newDiff];

      setConfig(newConfig);
      await settingsService.saveCustomConfig(newConfig);
    }
  };

  const handleConfigChange = async (key, value) => {
    if (difficulty === 'CUSTOM') {
      const numValue = parseFloat(value) || 0;
      const updated = { ...config, [key]: numValue };

      setConfig(updated);
      await settingsService.saveCustomConfig(updated);
    }
  };

  const isCustom = difficulty === 'CUSTOM';

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView
        style={styles.safeArea}
        edges={['bottom', 'left', 'right']}
      >
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

          <SettingsConfigs
            config={config}
            isCustom={isCustom}
            onChangeConfig={handleConfigChange}
          />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
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