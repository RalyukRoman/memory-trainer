import { useState, useEffect }     from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import ThemedText from '../components/ui/themed-text';
import ThemedView from '../components/ui/themed-view';

import StatsResetButton from '../components/stats-page/stats-reset-button';
import StatsScoreList   from '../components/stats-page/stats-score-list';
import StatsBestScore   from '../components/stats-page/stats-best-score';

import { getHighScoreKey }        from '../constants/storage-keys';
import { DIFFICULTIES }           from '../constants/game-values';
import { SPACING, BORDER_RADIUS } from '../constants/tokens';

export default function StatsPage() {
  const [scoresList, setScoresList] = useState([]);

  useEffect(() => {
    loadScores().then();
  }, []);

  const loadScoreByDifficulty = async ([
    difficulty, label
  ]) => {
    const rawScore = await AsyncStorage.getItem(
      getHighScoreKey(difficulty)
    );

    return {
      difficulty: difficulty,
      label: label,
      score: rawScore !== null
        ? parseInt(rawScore, 10)
        : 0,
    };
  };

  const loadScores = async () => {
    try {
      const loadedScores = await Promise.all(
        Object.entries(DIFFICULTIES).map(
          loadScoreByDifficulty
        )
      );

      setScoresList(loadedScores);
    }
    catch (err) {
      console.error('Error loading high scores:', err);
    }
  };

  const resetScores = async () => {
    try {
      for (const key of Object.keys(DIFFICULTIES)) {
        await AsyncStorage.removeItem(
          getHighScoreKey(key)
        );
      }

      setScoresList((prev) =>
        prev.map((item) => ({ ...item, score: 0 }))
      );
    }
    catch (err) {
      console.error('Error resetting scores:', err);
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Statistics',
      'Are you sure you want to reset all high scores?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset All',
          style: 'destructive',
          onPress: resetScores,
        },
      ]
    );
  };

  const bestScore = scoresList.length > 0
    ? Math.max(...scoresList.map((item) => item.score), 0)
    : 0;

  return (
    <ThemedView style={styles.container}>
      <ThemedView variant="element" style={styles.card}>
        <View style={styles.header}>
          <ThemedText variant="header">
            STATISTICS
          </ThemedText>

          <StatsResetButton onPress={handleReset} />
        </View>

        <StatsScoreList data={scoresList} />
        <StatsBestScore bestScore={bestScore} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.four,
  },
  card: {
    width: '100%',
    maxWidth: 320,
    padding: SPACING.four,
    borderRadius: BORDER_RADIUS.lg,
    gap: SPACING.two,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.three,
  },
});