import { StyleSheet, View } from 'react-native';
import { SPACING }          from '../../constants/tokens';

import GameInput        from './game-input';
import GameActionButton from './game-action-button';

export default function GameBar({
  input, setInput, inputRef,
  phase, isCorrect,
  onSubmit, onStartGame,
  onNextRound, onRestartGame,
}) {
  return (
    <View style={styles.container}>
      <GameInput
        input={input}
        setInput={setInput}
        phase={phase}
        inputRef={inputRef}
        onSubmit={onSubmit}
      />

      <GameActionButton
        phase={phase}
        isCorrect={isCorrect}
        onSubmit={onSubmit}
        onStartGame={onStartGame}
        onNextRound={onNextRound}
        onRestartGame={onRestartGame}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: SPACING.two,
  },
});