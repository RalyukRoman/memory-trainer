import { StyleSheet, View, Text, TextInput } from 'react-native';

import { GAME_PHASES }            from '../constants/game-values';
import { FONTS }                  from '../constants/fonts';
import { SPACING, BORDER_RADIUS } from '../constants/tokens';

export function GameInput({
  input, setInput, inputRef,
  phase, theme, onSubmit
}) {
  return (
    <View style={styles.container}>
      <Text style={[
        styles.inputLabel,
        { color: theme.text }
      ]}>
        Enter the numbers:
      </Text>

      <TextInput
        ref={inputRef}
        style={[
          styles.input,
          {
            color: theme.text,
            backgroundColor: theme.background,
            borderColor: theme.textSecondary,
          },
        ]}
        keyboardType="number-pad"
        value={input}
        onChangeText={setInput}
        editable={phase === GAME_PHASES.INPUT}
        onSubmitEditing={onSubmit}
        placeholderTextColor={theme.textSecondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: SPACING.two,
  },
  inputLabel: {
    alignSelf: 'flex-start',
    fontFamily: FONTS.sans,
    fontSize: 14,
  },
  input: {
    width: '100%',
    height: 48,
    paddingHorizontal: SPACING.three,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.sm,
    fontFamily: FONTS.mono,
    fontSize: 18,
    letterSpacing: 4,
    textAlign: 'center',
  },
});