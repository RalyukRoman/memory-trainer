import { StyleSheet, View, ScrollView } from 'react-native';
import { useTheme }                     from 'expo-router';

import ThemedText from '../ui/themed-text';
import ThemedView from '../ui/themed-view';

import { GAME_PHASES }            from '../../constants/game-values';
import { SPACING, BORDER_RADIUS } from '../../constants/tokens';

export default function GameNumberDisplay({
   phase, digits
}) {
  const theme = useTheme();

  const canShowNumbers =
    phase === GAME_PHASES.SHOW ||
    phase === GAME_PHASES.RESULT;

  if (
    phase === GAME_PHASES.IDLE ||
    phase === GAME_PHASES.STOPPED
  ){
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {digits.map((digit, index) => (
          <ThemedView
            key={index}
            variant="selected"
            style={[
              styles.box,
              {
                borderColor: !canShowNumbers
                  ? theme.colors.textSecondary
                  : 'transparent'
              },
            ]}
          >
            <ThemedText variant="monoDisplay">
              {canShowNumbers ? digit : '?'}
            </ThemedText>
          </ThemedView>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: SPACING.two,
  },
  scrollView: {
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.two,
    paddingVertical: SPACING.two,
    paddingHorizontal: SPACING.one,
  },
  box: {
    width: 42,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.xs,
  }
});