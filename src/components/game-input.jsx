import { StyleSheet, View } from 'react-native';

import ThemedText  from './ui/themed-text';
import ThemedInput from './ui/themed-input';

import { GAME_PHASES } from '../constants/game-values';
import { SPACING }     from '../constants/tokens';

export default function GameInput({
  input, setInput, inputRef,
  phase, onSubmit
}) {
  return (
    <View style={styles.container}>
      <ThemedText variant="small">
        Enter the numbers:
      </ThemedText>

      <ThemedInput
        ref={inputRef}
        keyboardType="number-pad"
        value={input}
        onChangeText={setInput}
        editable={phase === GAME_PHASES.INPUT}
        onSubmitEditing={onSubmit}
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