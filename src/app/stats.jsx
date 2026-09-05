import { useState, useCallback }   from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { SafeAreaView }            from 'react-native-safe-area-context';
import { useFocusEffect }          from 'expo-router';

import ThemedText from '../components/ui/themed-text';
import ThemedView from '../components/ui/themed-view';

import StatsResetButton from '../components/stats-page/stats-reset-button';
import StatsScoreList   from '../components/stats-page/stats-score-list';
import StatsBestScore   from '../components/stats-page/stats-best-score';
import StatsHistoryCard from '../components/stats-page/stats-history-card';

import { gameDb }                 from '../services/game-db';
import { scoreService }           from '../services/score-service';
import { SPACING, BORDER_RADIUS } from '../constants/tokens';

export default function StatsPage() {
  const [scoresList,  setScoresList]  = useState([]);
  const [historyList, setHistoryList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadData().then();
    }, [])
  );

  const loadData = async () => {
    const scores = await scoreService.loadAllHighScores();
    setScoresList(scores);

    const games = await gameDb.getAllGames();
    setHistoryList(games);
  };

  const resetScores = async () => {
    await scoreService.resetAllScores();

    setScoresList((prev) =>
      prev.map((item) => ({ ...item, score: 0 }))
    );
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Statistics',
      'Are you sure you want to reset all high scores?',
      [{
        text: 'Cancel',
        style: 'cancel',
      },{
        text: 'Reset All',
        style: 'destructive',
        onPress: resetScores,
      }]
    );
  };

  const scores = scoresList.map(
    (item) => item.score
  );

  const bestScore = scoresList.length > 0
    ? Math.max(...scores, 0)
    : 0;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView
        style={styles.safeArea}
        edges={['bottom', 'left', 'right']}
      >
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

        <StatsHistoryCard history={historyList} />
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
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.five,
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
    marginBottom: SPACING.one,
  },
});