import { StyleSheet, Pressable, Text } from 'react-native';

import { GAME_PHASES } from '../constants/game-values';
import { FONTS }       from '../constants/fonts';
import { SPACING }     from '../constants/tokens';

export function GameActionButton({
  phase, isCorrect, theme,
  onSubmit, onStartGame,
  onNextRound, onRestartGame
}) {
  const getButtonConfig = () => {
    if (phase === GAME_PHASES.IDLE) {
      return {
        disabled: false,
        text: 'START GAME',
        onPress: onStartGame,
      };
    }

    if (phase === GAME_PHASES.SHOW) {
      return {
        disabled: true,
        text: 'MEMORIZE...',
        onPress: null,
      };
    }

    if (phase === GAME_PHASES.INPUT) {
      return {
        disabled: false,
        text: 'SUBMIT',
        onPress: onSubmit,
      };
    }

    if (phase === GAME_PHASES.RESULT) {
      if (isCorrect) {
        return {
          disabled: false,
          text: 'NEXT LEVEL',
          onPress: onNextRound,
        };
      } else {
        return {
          disabled: false,
          text: 'TRY AGAIN',
          onPress: onRestartGame,
        };
      }
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
      <Text style={[
        styles.buttonText,
        { color: theme.background }
      ]}>
        {text}
      </Text>
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
    borderRadius: SPACING.two,
  },
  buttonText: {
    fontFamily: FONTS.sans,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  buttonPressed: {
    opacity: 0.8,
  },
});