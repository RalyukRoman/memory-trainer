import { StyleSheet, Pressable } from 'react-native';

import { useTheme } from '../../hooks/use-theme';
import ThemedText   from "../ui/themed-text";

import { GAME_PHASES }            from '../../constants/game-values';
import { SPACING, BORDER_RADIUS } from '../../constants/tokens';

export default function GameActionButton({
  phase, isCorrect,
  onSubmit, onStartGame,
  onNextRound, onRestartGame
}) {
  const theme = useTheme();

  const getButtonConfig = () => {
    switch (phase) {
      case GAME_PHASES.IDLE:
        return {disabled: false, text: 'START GAME', onPress: onStartGame};

      case GAME_PHASES.SHOW:
        return {disabled: true, text: 'MEMORIZE...', onPress: null};

      case GAME_PHASES.INPUT:
        return {disabled: false, text: 'SUBMIT', onPress: onSubmit};

      case GAME_PHASES.RESULT:
        return isCorrect
          ? {disabled: false, text: 'NEXT LEVEL', onPress: onNextRound}
          : {disabled: false, text: 'TRY AGAIN',  onPress: onRestartGame};
    }
  };

  const { disabled, text, onPress } = getButtonConfig();

  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: theme.text },
        disabled && styles.buttonDisabled,
        pressed  && styles.buttonPressed,
      ]}
      onPress={onPress}
    >
      <ThemedText
        variant="button"
        colorVariant="inverse"
      >
        {text}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.two,
    borderRadius: BORDER_RADIUS.sm,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});