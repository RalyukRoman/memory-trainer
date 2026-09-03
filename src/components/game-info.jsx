import { StyleSheet, View } from 'react-native';

import GameStatus from './game-status';
import GameTimer  from './game-timer';

import { SPACING } from '../constants/tokens';

export default function GameInfo({
  phase, timeLeft, isCorrect
}) {
  return (
    <View style={styles.container}>
      <GameStatus
        phase={phase}
        isCorrect={isCorrect}
      />

      <GameTimer
        phase={phase}
        timeLeft={timeLeft}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 52,
    gap: SPACING.one,
  },
});