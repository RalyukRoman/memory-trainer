import { StyleSheet, View } from 'react-native';
import { GAME_PHASES }      from '../../constants/game-values';
import { SPACING }          from '../../constants/tokens';

import ThemedInput from '../ui/themed-input';

export default function GameInput({
  input, setInput, inputRef,
  phase, onSubmit
}) {
  return (
    <View style={styles.container}>
      <ThemedInput
        ref={inputRef}
        style={{ letterSpacing: 4 }}
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
    alignItems: 'center',
    gap: SPACING.two,
  },
});