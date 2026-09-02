import { StyleSheet, View } from 'react-native';
import { GameInput }        from './game-input';
import { GameActionButton } from './game-action-button';
import { SPACING }          from '../constants/tokens';

export function GameBar({
  input, setInput, inputRef,
  phase, theme, isCorrect,
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
        theme={theme}
      />

      <GameActionButton
        phase={phase}
        isCorrect={isCorrect}
        onSubmit={onSubmit}
        onStartGame={onStartGame}
        onNextRound={onNextRound}
        onRestartGame={onRestartGame}
        theme={theme}
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