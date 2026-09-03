import { StyleSheet }  from 'react-native';
import { GAME_PHASES } from '../constants/game-values';
import ThemedText      from "./ui/themed-text";

export default function GameTimer({
  phase, timeLeft
}) {
  const isShowed = phase === GAME_PHASES.SHOW;

  const timeText = isShowed
    ? `${timeLeft.toFixed(2)}s`
    : 'Hidden'

  return (
    <ThemedText
      variant="small"
      style={styles.timerText}
    >
      {timeText}
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  timerText: {
    opacity: 0.8,
    fontSize: 14,
  },
});