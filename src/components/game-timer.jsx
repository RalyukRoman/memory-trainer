import ThemedText      from './ui/themed-text';
import { GAME_PHASES } from '../constants/game-values';

export default function GameTimer({
  phase, timeLeft
}) {
  if (phase !== GAME_PHASES.SHOW) {
    return null;
  }

  return (
    <ThemedText variant="monoValue">
      {timeLeft.toFixed(2)}s
    </ThemedText>
  );
}