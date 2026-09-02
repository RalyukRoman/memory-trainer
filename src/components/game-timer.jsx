import { StyleSheet, Text } from 'react-native';
import { GAME_PHASES }      from '../constants/game-values';

export function GameTimer({
  phase, timeLeft, theme,
}) {
  const isShowed = phase === GAME_PHASES.SHOW;

  const timeText = isShowed
    ? `${timeLeft.toFixed(2)}s`
    : 'Hidden'

  return (
    <Text style={[
      styles.timerText,
      { color: theme.text }
    ]}>
      {timeText}
    </Text>
  );
}

const styles = StyleSheet.create({
  timerText: {
    opacity: 0.8,
    fontSize: 14,
  },
});