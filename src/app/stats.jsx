import { useState, useEffect }                from 'react';
import { StyleSheet, View, Alert, Pressable } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../hooks/use-theme';

import ThemedView from '../components/ui/themed-view';
import ThemedText from '../components/ui/themed-text';

import { STORAGE_KEYS } from '../constants/storage-keys';
import { SPACING, BORDER_RADIUS } from '../constants/tokens';

export default function StatsPage() {
  const [highScore, setHighScore] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    loadScore().then();
  }, []);

  const loadScore = async () => {
    try {
      const rawScore = await AsyncStorage.getItem(
        STORAGE_KEYS.GAMEPLAY.HIGH_SCORE
      );

      if (rawScore !== null) {
        setHighScore(parseInt(rawScore, 10));
      }
    }
    catch (err) {
      console.error('Error loading high score:', err);
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Resetting statistics',
      'Are you sure you want to reset your record? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(STORAGE_KEYS.GAMEPLAY.HIGH_SCORE);
              setHighScore(0);
            } catch (err) {
              console.error('Error resetting score:', err);
            }
          }
        }
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedView variant="element" style={styles.card}>
          <ThemedText variant="headerTitle" style={styles.title}>
            СТАТИСТИКА
          </ThemedText>

          <View style={styles.statRow}>
            <ThemedText variant="default">Найкращий результат:</ThemedText>
            <ThemedText variant="monoDisplay">{highScore}</ThemedText>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.resetButton,
              { borderColor: theme.textSecondary },
              pressed && styles.buttonPressed,
            ]}
            onPress={handleReset}
          >
            <ThemedText variant="button" colorVariant="secondary">
              СКИНУТИ ОЧКИ
            </ThemedText>
          </Pressable>
        </ThemedView>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.four,
  },
  card: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    gap: SPACING.four,
    padding: SPACING.four,
    borderRadius: BORDER_RADIUS.lg,
  },
  title: {
    marginBottom: SPACING.two,
  },
  statRow: {
    alignItems: 'center',
    gap: SPACING.two,
  },
  resetButton: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.five,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.sm,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});