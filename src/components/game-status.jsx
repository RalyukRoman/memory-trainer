import ThemedText      from './ui/themed-text';
import { GAME_PHASES } from '../constants/game-values';

export default function GameStatus({
  phase, isCorrect
}) {
  const getStatusConfig = () => {
    switch (phase) {
      case GAME_PHASES.IDLE:
        return { text: 'Press START to play', color: null };

      case GAME_PHASES.INPUT:
        return { text: 'Enter the sequence:', color: null };

      case GAME_PHASES.RESULT:
        return isCorrect
          ? { text: 'Correct!', color: '#60b628' }
          : { text: 'Wrong!',   color: '#e13b3b' };

      default:
        return { text: null, color: null };
    }
  };

  const { text, color } = getStatusConfig();

  if (!text) {
    return null;
  }

  return (
    <ThemedText
      variant="monoValue"
      style={color ? { color } : undefined}
    >
      {text}
    </ThemedText>
  );
}